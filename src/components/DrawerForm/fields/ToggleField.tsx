interface ToggleFieldProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const ToggleField = ({ value, onChange }: ToggleFieldProps) => {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <div
        className={`peer h-6 w-11 rounded-full ${
          value ? "bg-main" : "bg-gray-200"
        } after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none`}
      ></div>
    </label>
  );
};
