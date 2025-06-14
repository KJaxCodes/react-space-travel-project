import React from "react";
import { render } from "@testing-library/react";
// components
import HomePage from "./pages/HomePage";

test("HomePage tests", () => {

    //expect(1).toBe(1);

    const { asFragment } = render(<HomePage />);

    expect(asFragment()).toMatchSnapshot();
})