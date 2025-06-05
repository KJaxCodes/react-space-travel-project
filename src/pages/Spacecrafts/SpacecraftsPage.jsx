//Show all spacecraft with ability to click for more info 
//Option to construct a new spacecraft
//Option to delete/decommission existing spacecraft - should I have my delete button here?
//Option to transfer spacecraft to a planet

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpaceTravel } from "../../context/SpaceTravelContext";

import SpaceTravelApi from "../../services/SpaceTravelApi"; // to get data from mock API - do I need this after making the loadInitialData action in SpaceTravelContext?

function SpacecraftsPage() {

    const {
        spacecrafts,
        decommissionSpacecraftById,
        assignSpacecraftToPlanet,
        loadInitialData,
        planets,
    } = useSpaceTravel();

    //local state
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlanetIds, setSelectedPlanetIds] = useState({});

    useEffect(() => {
        loadInitialData().finally(() => setIsLoading(false)); //update local loading state
    }, []);

    const handlePlanetSelect = (craftId, planetId) => {
        setSelectedPlanetIds((prev) => ({ ...prev, [craftId]: planetId, }));
    };

    const getPlanetNameById = (planetId) => {
        const planet = planets.find((p) => p.id === planetId);
        return planet ? planet.name : "Unassigned";
    };

    if (!spacecrafts) return <p>Loading spacecrafts....</p>;

    return (
        <div>
            <h2>🚀 All Spacecrafts</h2>
            <p>
                <Link to="/spacecrafts/build">🛠️ Build New Spacecraft</Link>
            </p>
            <ul>
                {spacecrafts.map((craft) => (
                    <li key={craft.id}>
                        <Link to={`/spacecrafts/${craft.id}`} title="View details">
                            🔍
                        </Link> {" "}
                        {craft.name}
                        <p>Capacity: {craft.capacity}</p>
                        <p>Currently on Planet: {getPlanetNameById(craft.currentLocation)}</p>
                        <button
                            onClick={() => decommissionSpacecraftById(craft.id)}
                            style={{ marginLeft: "1rem" }}
                        >
                            ♻️ Decommission Spacecraft
                        </button>

                        <div>
                            <label> 💫 Reassign Spacecraft Location:</label>{" "}
                            <select
                                value={selectedPlanetIds[craft.id]}
                                onChange={(e) => handlePlanetSelect(craft.id, e.target.value)}
                            >
                                <option value=""> Select Planet Reassignment</option>
                                {planets.map((planet) => (
                                    <option key={planet.id} value={planet.id}> {planet.name} </option>
                                ))}
                            </select> {" "}
                            <button
                                onClick={async () => {
                                    assignSpacecraftToPlanet({
                                        spacecraftId: craft.id,
                                        targetPlanetId: selectedPlanetIds[craft.id],
                                    });
                                    await loadInitialData();
                                }}
                                disabled={!selectedPlanetIds[craft.id]}
                            >
                                Assign
                            </button>
                        </div>

                    </li>
                ))}
            </ul>
        </div >
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