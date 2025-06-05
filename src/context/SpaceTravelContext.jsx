import { createContext, useContext, useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';

const SpaceTravelContext = createContext();

export const useSpaceTravel = () => useContext(SpaceTravelContext);

export const SpaceTravelProvider = ({ children }) => {
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [planets, setPlanets] = useState([]);


    //Actions

    //Construct new spacecraft
    const addSpacecraft = (newCraft) => {
        setSpacecrafts((prev) => [...prev, newCraft]);
    };

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

    // Load initial spacecrafts and planets

    const loadInitialData = async () => {
        try {
            const [spacecraftRes, planetsRes] = await Promise.all([
                SpaceTravelApi.getSpacecrafts(),
                SpaceTravelApi.getPlanets()
            ]);

            if (!spacecraftRes.isError) setSpacecrafts(spacecraftRes.data);
            if (!planetsRes.isError) setPlanets(planetsRes.data);
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
                addSpacecraft,
                decommissionSpacecraftById,
                loadInitialData,
            }}
        >
            {children}
        </SpaceTravelContext.Provider>
    );
};