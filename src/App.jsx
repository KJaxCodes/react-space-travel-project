import styles from "./App.module.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

//pages
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import PlanetsPage from "./pages/PlanetsPage";
import SpacecraftsPage from "./pages/Spacecrafts/SpacecraftsPage";
import Spacecraft from "./pages/Spacecrafts/Spacecraft";
import Construction from "./pages/Construction";

// layouts
import RootLayout from './layouts/RootLayout'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="planets" element={<PlanetsPage />} />
        <Route path="spacecrafts" element={<SpacecraftsPage />} />
        <Route path="spacecrafts/:id" element={<Spacecraft />} />
        <Route path="spacecrafts/build" element={<Construction />} />
      </Route>

      <Route path="*" element={<NotFound />} />
      {/* This catches ALL unmatched routes */}
    </>
  )
)


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
