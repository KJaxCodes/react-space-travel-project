import { useEffect, useState } from "react";
import { useSpaceTravel } from "../context/SpaceTravelContext";
import SpaceTravelApi from "../services/SpaceTravelApi"; // to get data from mock API

function PlanetsPage() {
  const {
    planets,
    spacecrafts,
    loadInitialData,
    isLoading,
  } = useSpaceTravel();

  useEffect(() => {
    loadInitialData();
  }, []); // Empty dependency array so it runs only once after initial render

  const getCraftsForPlanet = (planetId) =>
    spacecrafts.filter((craft) => parseInt(craft.currentLocation) === planetId);

  //To Do
  //set Assigned Spacecraft to "none assigned" if none assigned

  return (
    <div>
      <h2>Planets</h2>
      <ul>

        {
          isLoading ?
            <div>⏳ Loading ⌛</div>
            :
            planets.map((planet) => (
              <li key={planet.id}>
                <h4>{planet.name} </h4>
                <img src={planet.pictureUrl} alt={planet.name} style={{ width: "100px" }} />
                <p>Population: {planet.currentPopulation} </p>
                <p>Assigned Spacecraft:</p>
                {getCraftsForPlanet(planet.id).length === 0 ? (
                  <p className="none">No spacecraft assigned</p>
                ) : (
                  <ul>
                    {getCraftsForPlanet(planet.id).map((craft) => (
                      <li className="assigned" key={craft.id}>{craft.name}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))
        }
      </ul>
    </div>
  );
}

export default PlanetsPage;
