import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
//components
import PlanetsPage from "./pages/PlanetsPage";
import { SpaceTravelProvider } from "./context/SpaceTravelContext";
import { isTypedArray } from "util/types";
import SpaceTravelApi from "./services/SpaceTravelApi";
//interceptions - foundation for future end to end testing
import { mockGetPlanets, mockGetSpacecrafts } from "./test_helpers/interceptions";

jest.spyOn(SpaceTravelApi, "getPlanets").mockImplementation(mockGetPlanets);

jest.spyOn(SpaceTravelApi, "getSpacecrafts").mockImplementation(mockGetSpacecrafts);

describe("PlanetsPageTests", () => {

    // Rendering snapshot test
    test("Component renders correctly", async () => {

        const { asFragment } = render(
            <SpaceTravelProvider>
                <PlanetsPage />
            </SpaceTravelProvider>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot("planets-page-loading");

        await waitFor(() => {
            const planetsComponent = screen.getAllByTestId("planets-page");
            expect(planetsComponent.length).toEqual(8);
        });

        expect(asFragment()).toMatchSnapshot("planets-page-display");

    });

});



