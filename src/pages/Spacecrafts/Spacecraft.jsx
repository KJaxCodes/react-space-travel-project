//display details about a specific spacecraft

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SpaceTravelApi from "../../services/SpaceTravelApi";

function Spacecraft() {
    const { id } = useParams();
    const [spacecraft, setSpacecraft] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSpacecraft() {
            try {
                const response = await SpaceTravelApi.getSpacecraftById({ id });
                if (response.isError) throw new Error("Failed to load spacecraft.");
                setSpacecraft(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSpacecraft();
    }, [id]);

    if (isLoading) return <p>Loading spacecraft...⌛</p>
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>
    if (!spacecraft) return <p>No spacecraft found.</p>

    return (
        <div>
            <h2>{spacecraft.name}</h2>
            <p>Capacity: {spacecraft.capacity}</p>
            <p>Description: {spacecraft.description}</p>
            <p>Current Location (planet ID): {spacecraft.currentLocation}</p>
            {spacecraft.pictureUrl ? (
                <img src={spacecraft.pictureUrl} alt={spacecraft.name} width="300" />
            ) : (
                <p>No spacecraft image available.</p>
            )}
        </div>
    );

}

export default Spacecraft;