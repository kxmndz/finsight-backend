import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { simulations } from "../utils/testData";
import Header from "../components/layout/Header";
import SimulationDetailsItem from "../components/ui/SimulationDetailsItem";
import TitleCard from "../components/cards/TitleCard";
import Modal from "../components/ui/Modal";

const SimulationDetailsPage = () => {
	const { id } = useParams();
	const [simulation, setSimulation] = useState(null);

	const navigate = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	useEffect(() => {
		const found = simulations.find((sim) => String(sim.id) === String(id));
		setSimulation(found);
	}, [id]);

	if (!simulation) return <div className="p-4">Loading...</div>;

	return (
		<div className="bg-gray-50 min-h-screen">
			<Header onNewSimulationClick={openModal} />
			<div className="container mx-auto px-20 py-8 space-y-8 flex flex-col">
				<div className="max-w-6xl mx-auto p-6 space-y-6">
					<div className="relative group w-full">
						<TitleCard title={simulation.name}>
							<p>{simulation.segment}</p>
						</TitleCard>

						<button
							onClick={() => navigate(-1)}
							className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 bg-white text-blue-600 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in hover:cursor-pointer"
							aria-label="Back"
						>
							←
						</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<SimulationDetailsItem
							title="Market Fit Score"
							content={`${simulation.marketFitScore} / 10`}
						/>
						<SimulationDetailsItem
							title="Risk Level"
							content={simulation.riskLevel}
							type="risk"
						/>
						<SimulationDetailsItem
							title="Compliance Status"
							content={simulation.complianceStatus}
							type="compliance"
						/>
						<SimulationDetailsItem
							title="Key Features"
							content={simulation.keyFeatures}
						/>
						<SimulationDetailsItem
							title="Market Conditions"
							content={simulation.marketConditions}
						/>
						<SimulationDetailsItem
							title="Compliance Notes"
							content={simulation.complianceNotes}
						/>
					</div>
				</div>
			</div>

			{isModalOpen && (
				<Modal onClose={closeModal}>
					<SimulationForm onClose={closeModal} />
				</Modal>
			)}
		</div>
	);
};

export default SimulationDetailsPage;
