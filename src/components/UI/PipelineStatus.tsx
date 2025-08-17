import React from "react";

interface PipelineStage {
  name: string;
  color: string; // Hex color code (e.g., "#3b82f6")
  textColor?: string; // Optional text color (defaults to auto-calculated)
  badgeColor?: string; // Optional badge color (defaults to auto-calculated)
}

interface PipelineStatusProps {
  stages?: PipelineStage[];
  title?: string;
}

const PipelineStatus: React.FC<PipelineStatusProps> = ({
  stages: propStages,
  title = "Deals Pipeline Status",
}) => {
  // Default stages if none provided
  const defaultStages: PipelineStage[] = [
    { name: "Quality To Buy", color: "#EF4444" }, // red-500
    { name: "Contact Made", color: "#10B985" }, // green-500
    { name: "Presentation", color: "#F97316" }, // orange-500
    { name: "Proposal Made", color: "#3B82F6" }, // blue-500
    { name: "Appointment", color: "#8B5CF6" }, // purple-500
  ];

  const stages = propStages || defaultStages;

  // Helper: Convert HEX to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    let cleanHex = hex.replace("#", "").trim();

    // Expand shorthand #RGB to #RRGGBB
    if (cleanHex.length === 3) {
      cleanHex = cleanHex
        .split("")
        .map((c) => c + c)
        .join("");
    }

    if (!/^([0-9A-F]{6})$/i.test(cleanHex)) {
      throw new Error(`Invalid HEX color: ${hex}`);
    }

    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);

    return [r, g, b];
  };

  // Helper function to calculate text color based on background brightness
  const getTextColor = (bgColor: string): string => {
    const [r, g, b] = hexToRgb(bgColor);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#ffffff" : "#ffffff"; // gray-800 or white
  };

  return (
    <div className="py-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">{title}</h2>

      <div className="flex flex-wrap items-center gap-2">
        {stages.map((stage, index) => {
          const textColor = stage.textColor || getTextColor(stage.color);

          return (
            <div
              key={index}
              className={`relative flex h-10 flex-1 items-center gap-4 px-4 ${
                index === 0
                  ? "clip-path-first rounded-l-lg"
                  : index === stages.length - 1
                    ? "clip-path-last rounded-r-lg"
                    : "clip-path-middle"
              }`}
              style={{
                marginLeft: index > 0 ? "-10px" : "0",
                zIndex: stages.length - index,
                backgroundColor: stage.color,
                color: textColor,
              }}
            >
              <span className="whitespace-nowrap text-sm font-medium">
                {stage.name}
              </span>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .clip-path-first {
          clip-path: polygon(
            0% 0%,
            calc(100% - 10px) 0%,
            100% 50%,
            calc(100% - 10px) 100%,
            100% 100%,
            0% 100%
          );
        }
        .clip-path-middle {
          clip-path: polygon(
            0% 0%,
            calc(100% - 10px) 0%,
            100% 50%,
            calc(100% - 10px) 100%,
            0% 100%,
            10px 50%
          );
        }
        .clip-path-last {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 10px 50%);
        }
      `}</style>
    </div>
  );
};

export default PipelineStatus;
