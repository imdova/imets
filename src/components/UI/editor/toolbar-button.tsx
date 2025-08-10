"use client";

interface ToolbarButtonProps {
  icon: React.ElementType; // Update type to accept Material UI icon components
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

export function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  isActive = false,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center rounded-md ${
        isActive
          ? "bg-main text-white"
          : "border border-solid border-gray-100 bg-white hover:bg-gray-100"
      } h-8 w-8`}
      title={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
