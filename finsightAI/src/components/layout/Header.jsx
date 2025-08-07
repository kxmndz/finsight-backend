import { User, FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from React Router
import Button from "../ui/Button.jsx";
import logo from "/src/assets/FinSightAI-Logo2.png";

export const Header = ({ onNewSimulationClick }) => {
	return (
		<header className="bg-white border-b border-gray-200 shadow-sm w-full">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					{/* Left Section - Clickable logo + title */}
					<Link to="/" className="flex items-center space-x-4 group">
						<img
							src={logo}
							alt="FinSight AI Logo"
							className="h-12 w-12 sm:h-14 sm:w-14 transition-transform group-hover:scale-105"
						/>
						<div>
							<h1 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-700">
								FinSight AI
							</h1>
							<p className="text-xs sm:text-sm text-gray-500">
								MSME Market Simulation Platform
							</p>
						</div>
					</Link>

					{/* Right Section */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
							<Button variant="outline" size="md">
								<FileText className="h-4 w-4 mr-2" />
								Executive Report
							</Button>
							<Button
								variant="default"
								size="md"
								onClick={onNewSimulationClick}
							>
								<Plus className="h-4 w-4 mr-2" />
								New Simulation
							</Button>
						</div>

						{/* User Info */}
						<div className="flex items-center space-x-2 border-t sm:border-t-0 sm:border-l border-gray-200 pt-2 sm:pt-0 sm:pl-4">
							<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
								<User className="h-4 w-4 text-blue-600" />
							</div>
							<div>
								<p className="text-sm font-medium text-gray-900">
									Insert Username
								</p>
								<p className="text-xs text-gray-500">Insert Role</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
