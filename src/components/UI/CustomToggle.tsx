import { Check, X } from "lucide-react";

// Toggle Switch Component
const ToggleSwitch = ({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}) => {
  return (
    <button
      type="button"
      className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        enabled ? "bg-main" : "bg-gray-200"
      }`}
      onClick={() => setEnabled(!enabled)}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={`pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      >
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
            enabled
              ? "opacity-0 duration-100 ease-out"
              : "opacity-100 duration-200 ease-in"
          }`}
          aria-hidden="true"
        >
          <X size={12} className="text-gray-500" />
        </span>
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
            enabled
              ? "opacity-100 duration-200 ease-in"
              : "opacity-0 duration-100 ease-out"
          }`}
          aria-hidden="true"
        >
          <Check className="text-main" size={12} />
        </span>
      </span>
    </button>
  );
};

export default ToggleSwitch;
