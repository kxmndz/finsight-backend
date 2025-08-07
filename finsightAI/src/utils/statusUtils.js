import { CheckCircle, Clock, AlertTriangle, BarChart3 } from "lucide-react";

// Color
export const getComplianceColor = (status) => {
  return {
    passed: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
  }[status] || "bg-gray-100 text-gray-600";
};

export const getRiskColor = (risk) => {
  return {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  }[risk] || "bg-gray-100 text-gray-600";
};

export const getStatusTextColor = (status) => {
  return {
    all: "text-blue-600",
    passed: "text-green-600",
    pending: "text-yellow-600",
    failed: "text-red-600",
  }[status] || "text-gray-600";
};

//Icons
export const statusIcons = {
  all: { icon: BarChart3, color: "text-blue-600" },
  passed: { icon: CheckCircle, color: "text-green-600" },
  pending: { icon: Clock, color: "text-yellow-600" },
  failed: { icon: AlertTriangle, color: "text-red-600" },
};
