import { FileText } from "lucide-react";
import TitleCard from "../cards/TitleCard";
import DescriptionCard from "../cards/DescriptionCard";
import FormCard from "../cards/FormsCard";

const RerunSimulationForm = ({ onClose }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission
		onClose(); // Close modal after submission
	};

	return (
		<div className="space-y-4">
			<TitleCard title="Rerun Product Simulation">
				<p>Edit and test your current MSME product for compliance.</p>
			</TitleCard>

			<DescriptionCard title="Simulation Details">
				<form onSubmit={handleSubmit} className="space-y-4 mt-4">
					<FormCard label="Simulation Name">
						<input
							type="text"
							name="name"
							required
							className="w-full p-2 border rounded"
						/>
					</FormCard>

					<FormCard label="Segment">
						<input
							type="text"
							name="segment"
							required
							className="w-full p-2 border rounded"
						/>
					</FormCard>

					<FormCard label="Key Features">
						<textarea
							name="features"
							required
							className="min-h-16 w-full p-2 border rounded placeholder-italic placeholder:text-sm"
							placeholder="Describe the main features and benefits of this product..."
						></textarea>
					</FormCard>

					<FormCard label="Market Conditions">
						<textarea
							name="market"
							required
							className="min-h-16 w-full p-2 border rounded placeholder-italic placeholder:text-sm"
							placeholder="Describe the current market environment, competition, and opportunities..."
						></textarea>
					</FormCard>

					<FormCard label="Compliance Notes">
						<textarea
							name="compliance"
							required
							className="min-h-16 w-full p-2 border rounded placeholder-italic placeholder:text-sm"
							placeholder="Include BSP requirements, regulatory considerations, and compliance strategy..."
						></textarea>
					</FormCard>

					<div className="flex justify-end mt-4">
						<button
							type="submit"
							className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
						>
							Submit
						</button>
					</div>
				</form>
			</DescriptionCard>
		</div>
	);
};

export default RerunSimulationForm;
