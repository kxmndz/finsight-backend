import { useState } from "react";
import { Routes, Route } from "react-router-dom"; // Removed BrowserRouter here
import "./App.css";
import "./index.css";
import LoadingScreen from "./pages/LoadingScreen.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import SimulationDetailsPage from "./pages/SimulationDetailsPage";

function App() {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<>
			{!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
			<div
				className={`min-h-screen transition-opacity duration-700 ${
					isLoaded ? "opacity-100" : "opacity-0"
				} bg-gray-50 text-black-100`}
			>
				<Routes>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/simulations/:id" element={<SimulationDetailsPage />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
