//Show all spacecraft with ability to click for more info 
//Option to construct a new spacecraft
//Option to delete/decommission existing spacecraft - should I have my delete button here?
//Option to transfer spacecraft to a planet

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SpaceTravelApi from "../../services/SpaceTravelApi"; // to get data from mock API

function SpacecraftsPage() {

    const [spacecrafts, setSpacecrafts] = useState();

    //local state
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadSpacecrafts() {
            try {
                const response = await SpaceTravelApi.getSpacecrafts();
                if (response.isError) {
                    throw new Error("Failed to load spacecrafts.");
                }
                setSpacecrafts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadSpacecrafts();
    }, [setSpacecrafts]);

    return (
        <div>
            <h2>🚀 All Spacecrafts</h2>
            <p>
                <Link to="/spacecrafts/build">🛠️ Build New Spacecraft</Link>
            </p>
            {isLoading && <p>Loading spacecrafts...⌛</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {!isLoading && !error && (

                <ul>
                    {spacecrafts.map((craft) => (
                        <li key={craft.id}>
                            <Link to={`/spacecrafts/${craft.id}`} title="View details">
                                🔍
                            </Link> {" "}
                            {craft.name}  Capacity: {craft.capacity} Currently on Planet ID: {craft.currentLocation}
                            <button
                                onClick={() => decommissionSpacecraftById(craft.id)}
                                style={{ marginLeft: "1rem" }}
                            >
                                Decommission Spacecraft
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SpacecraftsPage;

// function SpacecraftsPage() {
//     return (
//         <div>
//             <h2>🚀 All Spacecrafts</h2>
//             <p>List of all spacecraft will go here.</p>
//         </div>
//     );
// }

// export default SpacecraftsPage;