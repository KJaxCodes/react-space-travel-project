//display details about a specific spacecraft
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import { useSpaceTravel } from "../../context/SpaceTravelContext";

function Spacecraft() {

    const {
        planets,
        spacecrafts,
        isLoading,
    } = useSpaceTravel();

    //local state
    const { id } = useParams();
    const [spacecraft, setSpacecraft] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSpacecraft() {
            try {
                const response = await SpaceTravelApi.getSpacecraftById({ id });
                if (response.isError) throw new Error("Failed to load spacecraft.");
                setSpacecraft(response.data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchSpacecraft();
    }, [id]);

    const getPlanetNameById = (planetId) => {
        const planet = planets.find((p) => p.id === planetId);
        return planet ? planet.name : "Unassigned";
    };

    if (isLoading || !spacecraft) return <p>Loading spacecraft...⌛</p>
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>

    return (
        <div>
            <h2>{spacecraft.name}</h2>
            <p>Capacity: {spacecraft.capacity}</p>
            <p>Description: {spacecraft.description}</p>
            <p>Current Location: {getPlanetNameById(parseInt(spacecraft.currentLocation))}</p>
            {spacecraft.pictureUrl ? (
                <img src={spacecraft.pictureUrl} alt={spacecraft.name} width="300" />
            ) : (
                <p>No spacecraft image available.</p>
            )}
        </div>
    );

}

export default Spacecraft;