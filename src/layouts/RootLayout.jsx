import { Outlet, NavLink } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <h1>Space Travel</h1>
        <nav>

          <NavLink to="/">⭐Home</NavLink>
          <NavLink to="planets">🌍Planets</NavLink>
          <NavLink to="spacecrafts">🚀Spacecrafts</NavLink>
        </nav>
      </header>
      <main>
        <BackButton />
        <Outlet />
      </main>
    </div>
  )
}