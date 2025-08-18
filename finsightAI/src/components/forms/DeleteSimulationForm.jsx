import Button from "../ui/Button";

const DeleteSimulationForm = ({ onClose }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		onClose(); // Close modal after submission
	};

	return (
		<div className="space-y-6 flex flex-col items-center text-center">
			<h1 className="text-lg font-semibold">Delete Market Simulation?</h1>

			<div className="flex gap-3 w-full max-w-xs">
				<Button
					variant="outline"
					size="md"
					onClick={onClose}
					className="flex-1"
				>
					No
				</Button>
				<Button
					variant="delete"
					size="md"
					onClick={handleSubmit}
					className="flex-1"
				>
					Yes
				</Button>
			</div>
		</div>
	);
};

export default DeleteSimulationForm;
