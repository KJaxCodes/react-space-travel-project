import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App.jsx";
import { SpaceTravelProvider } from "./context/SpaceTravelContext.jsx";

ReactDOM.createRoot(document.getElementById("root"))
	.render(
		<React.StrictMode>
			<SpaceTravelProvider>
				<App />
			</SpaceTravelProvider>
		</React.StrictMode>
	);
