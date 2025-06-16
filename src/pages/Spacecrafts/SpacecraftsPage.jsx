//Show all spacecraft with ability to click for more info 
//Display spacecraft name, capacity, current planet location 
//Option to construct a new spacecraft
//Option to delete/decommission existing spacecraft - should I have my delete button here? -refresh page? set to global state?
//Option to transfer spacecraft to a planet
//have a dropdown which would render all planets
//choose the planet to assign to craft to
//set spacecraft to the selected planet
//have a button called assign
//assigns it by target planet id and spacecraft id
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpaceTravel } from "../../context/SpaceTravelContext";
import Loader from "../../components/Loader";

function SpacecraftsPage() {

    const {
        spacecrafts,
        decommissionSpacecraftById,
        assignSpacecraftToPlanet,
        loadInitialData,
        planets,
        isLoading,
    } = useSpaceTravel();

    //local state
    // const [isLoading, setIsLoading] = useState(true); moved to global state
    const [error, setError] = useState(null);
    const [selectedPlanetIds, setSelectedPlanetIds] = useState({});

    useEffect(() => {
        //this is all we need
        loadInitialData();

    }, []);

    const handlePlanetSelect = (craftId, planetId) => {
        setSelectedPlanetIds((prev) => ({ ...prev, [craftId]: planetId, }));
    };

    const getPlanetNameById = (planetId) => {
        const planet = planets.find((p) => p.id === planetId);
        return planet ? planet.name : "Unassigned";
    };

    if (!spacecrafts) return <p>Loading spacecrafts......</p>

    return (
        <div>
            <h2>🚀 All Spacecrafts</h2>
            <p>
                <Link to="/spacecrafts/build">🛠️ Build New Spacecraft</Link>
            </p>
            <ul>
                {
                    isLoading ? (
                        <li>
                            <Loader />
                        </li>
                    ) :
                        spacecrafts.map((craft) => (
                            <li data-testid="spacecrafts-page" key={craft.id}>
                                <Link to={`/spacecrafts/${craft.id}`} title="View details">
                                    🔍
                                </Link> {" "}
                                {craft.name}
                                <p>Capacity: {craft.capacity}</p>
                                <p>Currently on Planet: {getPlanetNameById(parseInt(craft.currentLocation))}</p>
                                <p>
                                    <label>Decommission {craft.name}:</label>
                                    <button
                                        onClick={() => decommissionSpacecraftById(craft.id)}
                                        style={{ marginLeft: "1rem" }}
                                    >
                                        Decommission
                                    </button>
                                </p>

                                <p>
                                    <label> Reassign {craft.name}:</label>{" "}
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
                                </p>

                            </li>
                        ))
                }
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