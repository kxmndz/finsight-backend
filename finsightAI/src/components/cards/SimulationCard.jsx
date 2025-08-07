import { Link } from "react-router-dom";
import StatusStyles, { RiskBadge, ComplianceBadge } from "../ui/StatusStyles";

const SimulationCard = ({
	id,
	name,
	marketFitScore,
	riskLevel,
	complianceStatus,
	segment,
	lastUpdated,
}) => {
	return (
		<Link to={`/simulations/${id}`}>
			<div className="cursor-pointer rounded-xl border-l-4 border-l-blue-500 bg-white p-4 shadow-sm hover:shadow-lg transition-shadow space-y-4">
				<div className="flex items-start justify-between">
					<h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
						{name}
					</h3>
					<ComplianceBadge status={complianceStatus} />
				</div>

				<p className="text-sm text-gray-600 line-clamp-1">{segment}</p>

				<div className="flex items-center justify-between">
					<span className="text-sm text-gray-600">Market Fit Score: </span>
					<div className="flex items-center space-x-2">
						<div className="w-16 bg-gray-200 rounded-full h-2">
							<div
								className="bg-blue-600 h-2 rounded-full"
								style={{ width: `${(marketFitScore / 10) * 100}%` }}
							></div>
						</div>
						<span className="text-sm font-semibold">{marketFitScore}/10</span>
					</div>
				</div>

				<div className="flex items-center justify-between">
					<RiskBadge risk={riskLevel} />
					<span className="text-xs text-gray-500">Updated: {lastUpdated}</span>
				</div>
			</div>
		</Link>
	);
};

export default SimulationCard;
