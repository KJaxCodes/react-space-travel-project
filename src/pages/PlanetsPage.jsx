import { useEffect, useState } from "react";
import { useSpaceTravel } from "../context/SpaceTravelContext";
import SpaceTravelApi from "../services/SpaceTravelApi"; // to get data from mock API

function PlanetsPage() {
  const {
    planets,
    spacecrafts,
    loadInitialData,
  } = useSpaceTravel();

  useEffect(() => {
    loadInitialData();
  }, []); // Empty dependency array so it runs only once after initial render

  const getCraftsForPlanet = (planetId) =>
    spacecrafts.filter((craft) => craft.currentLocation === planetId);


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
      <ul>
        {planets.map((planet) => (
          <li key={planet.id}>
            <h4>{planet.name} </h4>
            <img src={planet.pictureUrl} alt={planet.name} style={{ width: "100px" }} />
            <p>Population: {planet.currentPopulation} </p>
            <p>Assigned Spacecraft:</p>
            <ul>
              {getCraftsForPlanet(planet.id).map((craft) => (
                <li key={craft.id}>{craft.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlanetsPage;
