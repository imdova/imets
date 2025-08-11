import { useState, useEffect } from "react";
import { DateFormField } from "../types";

interface TimePickerProps {
  value: string | Date;
  onChange: (value: string) => void;
  field: DateFormField<string>;
}

export const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const [timeValue, setTimeValue] = useState<string>(() => {
    if (value instanceof Date) {
      const hours = value.getHours().toString().padStart(2, "0");
      const minutes = value.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    if (typeof value === "string") {
      if (value.includes("T")) {
        const [hours, minutes] = value.split("T")[1].split(":");
        return `${hours}:${minutes}`;
      }
      return value;
    }
    return "";
  });

  useEffect(() => {
    onChange(timeValue);
  }, [timeValue, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(e.target.value);
  };

  return (
    <input
      type="time"
      value={timeValue}
      onChange={handleChange}
      className="block w-full rounded-md border border-gray-300 p-2 shadow-sm outline-none"
    />
  );
};
