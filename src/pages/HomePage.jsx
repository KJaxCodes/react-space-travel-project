import React from "react";

export default function HomePage() {
    return (
        <div className="home">
            <h2> Welcome, Commanders!</h2>

            <p className="home">
                In the not-so-distant future, Earth has fallen into ruin after centuries of environmental decline and neglect. But hope is not lost! Humanity has transformed other planets in our solar system into thriving, habitable worlds.
            </p>

            <p className="home">
                As a Commander, your mission is critical: evacuate the remaining population from Earth and lead them to safety using advanced spacecraft.
            </p>

            <h3>🚀 What You Can Do:</h3>
            <ul>
                <li>View a list of available spacecraft and their current locations and detailed specs.</li>
                <li>Build a new spacecraft to aid in the evacuation efforts.</li>
                <li>Decommission old and damaged spacecraft.</li>
                <li>Explore planets and see what spacecraft are stationed there.</li>
                <li>View a list of available spacecraft and their current locations.</li>
                <li>Send spacecraft from one planet to another to safely relocate people.</li>
            </ul>

            <p className="home">
                This is your command center. Plan strategically, act swiftly, and lead humanity to a new beginning!
            </p>
        </div>
    )
}