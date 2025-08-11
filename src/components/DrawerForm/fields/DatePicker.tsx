import { useState, useEffect } from "react";
import { DateFormField } from "../types";

interface DatePickerProps {
  value: string | Date;
  onChange: (value: string) => void;
  field: DateFormField<string>;
}

export const DatePicker = ({ value, onChange, field }: DatePickerProps) => {
  const [dateValue, setDateValue] = useState<string>(() => {
    if (value instanceof Date) return value.toISOString().split("T")[0];
    if (typeof value === "string") return value.split("T")[0];
    return "";
  });
  const [showPicker, setShowPicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  useEffect(() => {
    onChange(dateValue);
  }, [dateValue, onChange]);

  useEffect(() => {
    if (dateValue) {
      setCurrentMonth(new Date(dateValue));
    }
  }, [dateValue]);

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    setDateValue(dateString);
    setShowPicker(false);
  };

  const renderDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const startingDayOfWeek = firstDayOfMonth.getDay();

    const days = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div
          key={`prev-${i}`}
          className="flex h-8 w-8 cursor-default items-center justify-center text-gray-400"
        >
          {prevMonthLastDay - startingDayOfWeek + i + 1}
        </div>,
      );
    }

    // Current month days
    const today = new Date();
    const selectedDate = dateValue ? new Date(dateValue) : null;

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isToday =
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year;
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;
      const isDisabled =
        (field.minDate && currentDate < new Date(field.minDate)) ||
        (field.maxDate && currentDate > new Date(field.maxDate));

      days.push(
        <div
          key={`day-${day}`}
          onClick={() => !isDisabled && handleDateSelect(currentDate)}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${isSelected ? "bg-main-transparent0 text-white" : ""} ${isToday && !isSelected ? "border-mainbg-main-transparent0 border" : ""} ${isDisabled ? "cursor-not-allowed text-gray-300" : "cursor-pointer hover:bg-gray-100"} `}
        >
          {day}
        </div>,
      );
    }

    // Next month days
    const daysToShow = 42 - days.length; // 6 weeks
    for (let i = 1; i <= daysToShow; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="flex h-8 w-8 cursor-default items-center justify-center text-gray-400"
        >
          {i}
        </div>,
      );
    }

    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + direction,
        1,
      ),
    );
  };

  const changeMonth = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    setShowMonthPicker(false);
  };

  const changeYear = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setShowYearPicker(false);
  };

  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    const range = 10; // Show 10 years before and after current year

    for (let i = currentYear - range; i <= currentYear + range; i++) {
      years.push(i);
    }

    return years;
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="relative">
      <div
        className="hover:border-mainbg-main-transparent0 flex cursor-pointer items-center rounded-md border border-gray-300 p-2 transition-colors"
        onClick={() => setShowPicker(!showPicker)}
      >
        <input
          type="text"
          readOnly
          value={dateValue}
          className="w-full cursor-pointer bg-transparent outline-none"
          placeholder="Select date"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {showPicker && (
        <div className="absolute z-10 mt-1 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex space-x-2">
              <div
                className="cursor-pointer rounded px-1 font-medium text-gray-700 hover:text-main"
                onClick={() => {
                  setShowMonthPicker(!showMonthPicker);
                  setShowYearPicker(false);
                }}
              >
                {months[currentMonth.getMonth()]}
              </div>
              <div
                className="cursor-pointer rounded px-1 font-medium text-gray-700 hover:text-main"
                onClick={() => {
                  setShowYearPicker(!showYearPicker);
                  setShowMonthPicker(false);
                }}
              >
                {currentMonth.getFullYear()}
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {showMonthPicker && (
            <div className="mb-4 grid grid-cols-3 gap-2">
              {months.map((month, index) => (
                <div
                  key={month}
                  onClick={() => changeMonth(index)}
                  className={`cursor-pointer rounded p-1 text-center text-sm hover:bg-gray-100 ${currentMonth.getMonth() === index ? "bg-blue-100 text-main" : ""} `}
                >
                  {month.substring(0, 3)}
                </div>
              ))}
            </div>
          )}

          {showYearPicker && (
            <div className="mb-4 grid max-h-40 grid-cols-4 gap-2 overflow-y-auto">
              {getYearRange().map((year) => (
                <div
                  key={year}
                  onClick={() => changeYear(year)}
                  className={`cursor-pointer rounded p-1 text-center text-sm hover:bg-gray-100 ${currentMonth.getFullYear() === year ? "bg-blue-100 text-main" : ""} `}
                >
                  {year}
                </div>
              ))}
            </div>
          )}

          {!showMonthPicker && !showYearPicker && (
            <>
              <div className="mb-2 grid grid-cols-7 gap-1">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
            </>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setShowPicker(false)}
              className="rounded px-3 py-1 text-sm text-main hover:bg-main-transparent"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
