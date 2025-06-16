import React from "react";
import { render } from "@testing-library/react";

//components
import SpacecraftsPage from "./pages/Spacecrafts/SpacecraftsPage";
import { SpaceTravelProvider } from "./context/SpaceTravelContext";
import SpaceTravelApi from "./services/SpaceTravelApi";
import { MemoryRouter } from "react-router-dom";

test("Spacecrafts Render Correctly", () => {

    const { asFragment } = render(
        <MemoryRouter>
            <SpaceTravelProvider>
                <SpacecraftsPage />
            </SpaceTravelProvider>
        </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot("spacecrafts-page");
});