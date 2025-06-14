import React from "react";
import { render } from "@testing-library/react";
//components
import PlanetsPage from "./pages/PlanetsPage";

test("Planets Render Correctly", () => {

    render(
        <PlanetsPage />
    );

});