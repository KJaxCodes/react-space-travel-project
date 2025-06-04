import { NavLink } from "react-router-dom"

export default function NotFound() {
    return (
        <div>
            <h2>Page not found!</h2>

            <p>Go back to <NavLink to="/">⭐ Home</NavLink>.</p>
        </div>
    )
}
