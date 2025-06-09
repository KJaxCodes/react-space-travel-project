import { createContext, useContext, useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';

const SpaceTravelContext = createContext();

export const useSpaceTravel = () => useContext(SpaceTravelContext);

export const SpaceTravelProvider = ({ children }) => {
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [planets, setPlanets] = useState([]);


    //Actions

    //Construct new spacecraft
    // const addSpacecraft = (newCraft) => {
    //     console.log("newcraft", newCraft);
    //     setSpacecrafts((prev) => [...prev, newCraft]);
    // };

    //Decommission spacecraft by ID
    const decommissionSpacecraftById = async (id) => {
        try {
            const response = await SpaceTravelApi.destroySpacecraftById(id);
            if (response.isError) {
                throw new Error("Failed to decommission.");
            }
            setSpacecrafts((prev) => prev.filter((craft) => craft.id !== id));
        } catch (err) {
            console.error("Decommission failure", err.message);
        }
    };

    //Assign or reassign spacecraft to planet
    const assignSpacecraftToPlanet = async ({ spacecraftId, targetPlanetId }) => {
        try {
            const response = await SpaceTravelApi.sendSpacecraftToPlanet({
                spacecraftId, targetPlanetId
            });
            if (!response.isError) {
                setSpacecrafts((prev) =>
                    prev.map((craft) =>
                        craft.id === spacecraftId ? { ...craft, currentLocation: targetPlanetId } : craft
                    )
                );
            }
        } catch (err) {
            console.error("Failed to assign spacecraft", err.message);
        }
    }

    // Load initial spacecrafts and planets

    const loadInitialData = async () => {
        try {
            // planetsRes] = await Promise.all([
            //     SpaceTravelApi.getSpacecrafts(),
            //     SpaceTravelApi.getPlanets()
            // ]);

            const spacecraftRes = await SpaceTravelApi.getSpacecrafts();
            const planetRes = await SpaceTravelApi.getPlanets();

            if (spacecraftRes.isError) {
                console.log("loadInitialData Error: Spacecraft");
                console.debug(spacecraftRes);
            }
            if (planetRes.isError) {
                console.log("loadInitialData Error: Planet");
                console.debug(spacecraftRes);
            }

            setSpacecrafts(spacecraftRes.data);
            setPlanets(planetRes.data);

        } catch (err) {
            console.error("Failed to load initial data", err.message);
        }
    }

    return (
        <SpaceTravelContext.Provider
            value={{
                spacecrafts,
                setSpacecrafts,
                planets,
                setPlanets,
                // addSpacecraft,
                decommissionSpacecraftById,
                assignSpacecraftToPlanet,
                loadInitialData,
            }}
        >
            {children}
        </SpaceTravelContext.Provider>
    );
};