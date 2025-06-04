import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpaceTravel } from "../context/SpaceTravelContext";
import SpaceTravelApi from "../services/SpaceTravelApi"; // to get data from mock API
import SpacecraftSelector from "../components/SpacecraftSelector";

function PlanetsPage() {
  const {
    planets,
    setPlanets,
    spacecrafts,
    setSpacecrafts,
    decommissionSpacecraftById,
    spacecraftId,
    currentCraft,
    setCurrentCraft,

  } = useSpaceTravel();



  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //event listeners and dispatchers

  const handleSetSelectedCraft = (craft) => {
    setCurrentCraft(craft);
  };

  const handleAssignCraftToPlanet = async (planetId) => {

    const craftId = currentCraft.id;
    try {
      const response = await SpaceTravelApi.sendSpacecraftToPlanet({ spacecraftId: craftId, targetPlanetId: planetId })
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
    console.log(currentCraft);
  };


  useEffect(() => {
    async function loadPlanets() {
      try {
        const response = await SpaceTravelApi.getPlanets();
        if (response.isError) {
          throw new Error("Failed to load planets.");
        }
        setPlanets(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    async function loadSpacecrafts() {
      try {
        const response = await SpaceTravelApi.getSpacecrafts();
        if (response.isError) {
          throw new Error("Failed to load spacecraft.");
        }
        setSpacecrafts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadPlanets()
    loadSpacecrafts()

  }, []); // Empty dependency array so it runs only once after initial render

  useEffect(() => {
    if (planets.length > 0 && spacecrafts.length > 0) {
      console.log(planets);
      console.log(spacecrafts);
    }
  }, [planets, spacecrafts]);


  //TODO
  //fetch all current spacecraft available
  //set them to local state
  //then have a dropdown component which would render an N amount of spacecraft to select
  //upon selection: "Example: Brutus", the selection then filteres the fetched spacecraft by name
  //set the selected spacecraft to current -
  //have a button called assign
  //dispatches it by planet id and spacecraft id


  return (
    <div>
      <h2>Planets</h2>
      {isLoading && <p>Loading planets...⌛</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!isLoading && !error && (

        <ul>
          {planets.map((planet) => (
            <li key={planet.id}>
              <h4>{planet.name} </h4>
              <img src={planet.pictureUrl} alt={planet.name} style={{ width: "100px" }} />
              <p>Population: {planet.currentPopulation} </p>
              <p>Assigned Spacecraft:</p>
              <SpacecraftSelector spacecrafts={spacecrafts} currentCraft={currentCraft} handleSetSelectedCraft={handleSetSelectedCraft} />
              <button onClick={() => handleAssignCraftToPlanet(planet.id)}>Assign</button>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PlanetsPage;
