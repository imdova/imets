import { Settings } from "lucide-react";
import ToggleSwitch from "../CustomToggle";

// Policy card component
type PolicyCardProps = {
  title: string;
  policyType: string;
  onEdit: () => void;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
};

const PolicyCard = ({
  title,
  policyType,
  onEdit,
  enabled,
  onToggle,
}: PolicyCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <ToggleSwitch enabled={enabled} setEnabled={onToggle} />
            <h3 className="font-medium text-gray-900">{title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium text-main underline">
            {policyType}
          </button>
          <button
            onClick={onEdit}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            <Settings size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;
