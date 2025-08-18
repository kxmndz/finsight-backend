import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { simulations } from "../utils/testData";
import Header from "../components/layout/Header";
import SimulationDetailsItem from "../components/ui/SimulationDetailsItem";
import TitleCard from "../components/cards/TitleCard";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import NewSimulationForm from "../components/forms/NewSimulationForm";
import RerunSimulationForm from "../components/forms/RerunSimulationForm";
import DeleteSimulationForm from "../components/forms/DeleteSimulationForm";

const SimulationDetailsPage = () => {
	const { id } = useParams();
	const [simulation, setSimulation] = useState(null);

	const navigate = useNavigate();

	// track which modal is open
	const [modalType, setModalType] = useState(null); // "new" | "rerun" | null

	const openModal = (type) => setModalType(type);
	const closeModal = () => setModalType(null);

	useEffect(() => {
		const found = simulations.find((sim) => String(sim.id) === String(id));
		setSimulation(found);
	}, [id]);

	if (!simulation) return <div className="p-4">Loading...</div>;

	return (
		<div className="bg-gray-50 min-h-screen">
			<Header onNewSimulationClick={() => openModal("new")} />
			<div className="container mx-auto px-20 py-8 space-y-8 flex flex-col">
				<div className="max-w-6xl mx-auto p-6 space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Button variant="outline" size="md" onClick={() => navigate(-1)}>
							Return to Dashboard
						</Button>
						<Button
							variant="rerun"
							size="md"
							onClick={() => openModal("rerun")}
						>
							Re-run Simulation
						</Button>
						<Button
							variant="delete"
							size="md"
							onClick={() => openModal("delete")}
						>
							Delete Simulation
						</Button>
					</div>

					<TitleCard title={simulation.name}>
						<p>{simulation.segment}</p>
					</TitleCard>

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

			{modalType && (
				<Modal onClose={closeModal}>
					{modalType === "new" && <NewSimulationForm onClose={closeModal} />}
					{modalType === "rerun" && (
						<RerunSimulationForm onClose={closeModal} />
					)}
					{modalType === "delete" && (
						<DeleteSimulationForm onClose={closeModal} />
					)}
				</Modal>
			)}
		</div>
	);
};

export default SimulationDetailsPage;
