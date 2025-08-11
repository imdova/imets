import Image from "next/image";
import { useState, useEffect } from "react";

// Dummy data for a variety of countries, using English names.
const DUMMY_COUNTRIES = [
  { code: "US", name: "United States", phoneCode: "+1" },
  { code: "GB", name: "United Kingdom", phoneCode: "+44" },
  { code: "CA", name: "Canada", phoneCode: "+1" },
  { code: "AU", name: "Australia", phoneCode: "+61" },
  { code: "IN", name: "India", phoneCode: "+91" },
  { code: "JP", name: "Japan", phoneCode: "+81" },
  { code: "DE", name: "Germany", phoneCode: "+49" },
  { code: "FR", name: "France", phoneCode: "+33" },
  { code: "SA", name: "Saudi Arabia", phoneCode: "+966" },
  { code: "AE", name: "United Arab Emirates", phoneCode: "+971" },
  { code: "QA", name: "Qatar", phoneCode: "+974" },
  { code: "EG", name: "Egypt", phoneCode: "+20" },
  { code: "JO", name: "Jordan", phoneCode: "+962" },
  { code: "IQ", name: "Iraq", phoneCode: "+964" },
  { code: "LB", name: "Lebanon", phoneCode: "+961" },
  { code: "OM", name: "Oman", phoneCode: "+968" },
  { code: "SY", name: "Syria", phoneCode: "+963" },
  { code: "KW", name: "Kuwait", phoneCode: "+965" },
  { code: "BH", name: "Bahrain", phoneCode: "+973" },
  { code: "YE", name: "Yemen", phoneCode: "+967" },
  { code: "DZ", name: "Algeria", phoneCode: "+213" },
  { code: "MA", name: "Morocco", phoneCode: "+212" },
  { code: "TN", name: "Tunisia", phoneCode: "+216" },
];

// The main App component to demonstrate the PhoneInput component
export default function App() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const field = {
    placeholder: "Phone number",
    defaultCountry: "US", // Changed default country to US
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 font-sans antialiased">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Phone Input
        </h1>
        <p className="mb-4 text-center text-sm text-gray-600">
          Select a country from the dropdown to automatically add the correct
          country code.
        </p>
        <PhoneInput
          value={phoneNumber}
          onChange={setPhoneNumber}
          field={field}
        />
        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-gray-700">
            <span className="font-semibold">Current Value:</span>{" "}
            <span className="rounded bg-gray-200 px-2 py-1 font-mono text-sm">
              {phoneNumber || "No number entered"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Type definitions for the data
interface Country {
  code: string;
  name: string;
  phoneCode: string;
  flagUrl: string; // Added flagUrl for the API-provided image
}

interface PhoneFormField {
  placeholder?: string;
  defaultCountry?: string;
}

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  field: PhoneFormField;
}

export const PhoneInput = ({ value, onChange, field }: PhoneInputProps) => {
  // State for the list of countries and the selected country
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to get the flag URL from a free API
  const getFlagUrl = (code: string) => {
    // This API provides flag images based on the country code
    return `https://flagcdn.com/w20/${code.toLowerCase()}.png`;
  };

  // Effect to initialize countries with dummy data and set default country
  useEffect(() => {
    // Map the dummy data to include the flagUrl and sort alphabetically
    const allCountries = DUMMY_COUNTRIES.map((country) => ({
      ...country,
      flagUrl: getFlagUrl(country.code),
    })).sort((a, b) => a.name.localeCompare(b.name));
    setCountries(allCountries);

    // Set the default country based on the field prop
    const defaultCountry = allCountries.find(
      (c: Country) => c.code === (field.defaultCountry || "US"),
    );
    if (defaultCountry) {
      setSelectedCountry(defaultCountry);
    }
  }, [field.defaultCountry]);

  // Effect to update the phone number when the value or selected country changes
  useEffect(() => {
    if (value && selectedCountry) {
      // Extract the number part without the country code
      const countryCode = selectedCountry.phoneCode;
      if (value.startsWith(countryCode)) {
        setPhoneNumber(value.replace(countryCode, ""));
      } else {
        setPhoneNumber(value);
      }
    } else if (value === "") {
      // Clear the phone number if the value prop is an empty string
      setPhoneNumber("");
    }
  }, [value, selectedCountry]);

  // Handler for input change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Keep only digits
    setPhoneNumber(inputValue);
    if (selectedCountry) {
      onChange(`${selectedCountry.phoneCode}${inputValue}`);
    }
  };

  // Handler for country selection from the dropdown
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    if (phoneNumber) {
      onChange(`${country.phoneCode}${phoneNumber}`);
    }
  };

  return (
    <div className="relative font-sans text-gray-800">
      <div className="flex overflow-hidden rounded-lg border border-gray-300 shadow-sm">
        {/* Country Selector Button */}
        <button
          type="button"
          className="flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedCountry ? (
            <>
              <Image
                width={60}
                height={60}
                src={selectedCountry.flagUrl}
                alt={`${selectedCountry.name} flag`}
                className="mr-2 h-5 w-5 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }} // Hide image on error
              />
              <span className="font-semibold">{selectedCountry.phoneCode}</span>
            </>
          ) : (
            <span className="text-gray-500">Select</span>
          )}
          <svg
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* Phone Number Input */}
        <input
          type="tel" // Use 'tel' for better mobile experience
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={field.placeholder || "Phone number"}
          className="block w-full rounded-r-lg border-0 p-3 text-sm outline-none"
        />
      </div>

      {/* Country Dropdown */}
      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 max-h-60 w-full min-w-max overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-xl">
          <div className="border-b border-gray-200 bg-gray-100 px-4 py-2">
            <p className="text-sm font-semibold text-gray-700">
              Countries ({countries.length})
            </p>
          </div>
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              className="flex w-full items-center px-4 py-2 text-left text-sm transition-colors hover:bg-blue-50"
              onClick={() => handleCountrySelect(country)}
            >
              <Image
                width={100}
                height={100}
                src={country.flagUrl}
                alt={`${country.name} flag`}
                className="mr-3 h-5 w-5 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="flex-grow">{country.name}</span>
              <span className="ml-auto font-mono text-gray-500">
                {country.phoneCode}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
