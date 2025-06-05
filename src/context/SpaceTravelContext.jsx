import { createContext, useContext, useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';

const SpaceTravelContext = createContext();

export const useSpaceTravel = () => useContext(SpaceTravelContext);

export const SpaceTravelProvider = ({ children }) => {
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [spacecraftId, setSpacecraftId] = useState([]);


    //Actions
    const addSpacecraft = (newCraft) => {
        setSpacecrafts((prev) => [...prev, newCraft]);
    };

    const decommissionSpacecraftById = async (id) => {
        try {
            const response = await SpaceTravelApi.destroySpacecraftById(id);
            if (response.isError) {
                throw new Error("Failed to delete.");
            }
            setSpacecrafts((prev) => prev.filter((craft) => craft.id !== id));
        } catch (err) {
            console.error("Decommission failure", err.message);
        }
    }; 5454

    return (
        <SpaceTravelContext.Provider
            value={{
                setSpacecrafts,
                setPlanets,
                addSpacecraft,
                decommissionSpacecraftById,
            }}
        >
            {children}
        </SpaceTravelContext.Provider>
    );
};