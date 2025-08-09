import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";

type Country = {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
};

type PhoneInputProps = {
  name: string;
  required?: boolean;
  defaultValue?: string;
  label?: string;
};

const COUNTRIES: Country[] = [
  { code: "SA", name: "السعودية", dialCode: "+966", flag: "sa" },
  { code: "AE", name: "الإمارات", dialCode: "+971", flag: "ae" },
  { code: "EG", name: "مصر", dialCode: "+20", flag: "eg" },
  { code: "JO", name: "الأردن", dialCode: "+962", flag: "jo" },
  { code: "KW", name: "الكويت", dialCode: "+965", flag: "kw" },
  { code: "QA", name: "قطر", dialCode: "+974", flag: "qa" },
  { code: "BH", name: "البحرين", dialCode: "+973", flag: "bh" },
  { code: "OM", name: "عمان", dialCode: "+968", flag: "om" },
  { code: "DZ", name: "الجزائر", dialCode: "+213", flag: "dz" },
  { code: "MA", name: "المغرب", dialCode: "+212", flag: "ma" },
  { code: "TN", name: "تونس", dialCode: "+216", flag: "tn" },
  { code: "LB", name: "لبنان", dialCode: "+961", flag: "lb" },
  { code: "IQ", name: "العراق", dialCode: "+964", flag: "iq" },
  { code: "SY", name: "سوريا", dialCode: "+963", flag: "sy" },
  { code: "YE", name: "اليمن", dialCode: "+967", flag: "ye" },
  { code: "SD", name: "السودان", dialCode: "+249", flag: "sd" },
  { code: "PS", name: "فلسطين", dialCode: "+970", flag: "ps" },
];

const PhoneInput: React.FC<PhoneInputProps> = ({
  name,
  required = false,
  defaultValue = "",
  label = "رقم الهاتف",
}) => {
  const { control, setValue, register } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue("phone_code", selectedCountry.dialCode);
  }, [selectedCountry, setValue]);

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter(
      (country) =>
        country.name.includes(searchTerm) ||
        country.dialCode.includes(searchTerm),
    );
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div dir="rtl" className="w-full space-y-1">
      <label
        htmlFor={name}
        className="block w-fit text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="mr-1 text-red-500">*</span>}
      </label>

      <div className="relative flex rounded-lg border border-gray-300 shadow-sm transition-all duration-200">
        {/* Country Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex h-full items-center justify-center rounded-s-lg border-e border-gray-300 bg-gray-50 px-3 py-2 transition-colors hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-2">
              <Image
                width={20}
                height={20}
                src={`https://flagcdn.com/h20/${selectedCountry.flag}.png`}
                alt={selectedCountry.name}
                className="h-4 w-4 rounded-full"
              />
              <span className="text-sm text-gray-700">
                {selectedCountry.dialCode}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute z-10 mt-1 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
              <div className="border-b border-gray-200 p-2">
                <input
                  type="text"
                  placeholder="ابحث عن الدولة..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ul className="max-h-60 overflow-auto">
                {filteredCountries.map((country) => (
                  <li
                    key={country.code}
                    className="flex cursor-pointer items-center px-4 py-2 transition-colors hover:bg-blue-50"
                    onClick={() => {
                      setSelectedCountry(country);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    <Image
                      width={20}
                      height={20}
                      src={`https://flagcdn.com/h20/${country.flag}.png`}
                      alt={country.name}
                      className="mr-2 h-4 w-4 rounded-full"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {country.dialCode}
                    </span>
                    <span className="mr-auto text-sm text-gray-600">
                      {country.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Phone Input */}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={{
            required: required ? "رقم الهاتف مطلوب" : false,
            pattern: {
              value: /^[\d\s\-()]+$/,
              message: "يرجى إدخال رقم هاتف صالح",
            },
            minLength: {
              value: 8,
              message: "يجب أن يكون رقم الهاتف 8 أرقام على الأقل",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className="relative flex-1">
              <input
                {...field}
                type="tel"
                dir="rtl"
                className="w-full rounded-e-lg border-0 px-3 py-2 text-sm focus:outline-none focus:ring-0"
                placeholder="مثال: 123 456 789"
                onInput={(e) => {
                  // Format phone number as user types
                  const value = e.currentTarget.value.replace(/\D/g, "");
                  const formatted = value.replace(/(\d{3})(?=\d)/g, "$1 ");
                  e.currentTarget.value = formatted;
                  field.onChange(formatted);
                }}
              />
              {error && (
                <p className="absolute mt-1 text-xs text-red-600">
                  {error.message}
                </p>
              )}
            </div>
          )}
        />
        <input
          type="hidden"
          value={selectedCountry.dialCode}
          {...register("phone_code")}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
