import React from 'react';
import { createContext, useContext, useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';

const SpaceTravelContext = createContext();

export const useSpaceTravel = () => useContext(SpaceTravelContext);

export const SpaceTravelProvider = ({ children }) => {
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    //Actions

    //Decommission spacecraft by ID
    const decommissionSpacecraftById = async (id) => {

        try {
            setIsLoading(true);
            const response = await SpaceTravelApi.destroySpacecraftById({ id: id });
            if (response.isError) {
                throw new Error("Failed to decommission.");
            }
            setSpacecrafts((prev) => prev.filter((craft) => craft.id !== id));
        } catch (err) {
            console.error("Decommission failure", err.message);
        } finally {
            console.log("This will always run");
            setIsLoading(false);
            console.log("And we are done loading");
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
            setIsLoading(true);

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
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SpaceTravelContext.Provider
            value={{
                spacecrafts,
                setSpacecrafts,
                planets,
                setPlanets,
                decommissionSpacecraftById,
                assignSpacecraftToPlanet,
                loadInitialData,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </SpaceTravelContext.Provider>
    );
};