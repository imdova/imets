import { useCountryFlag } from "@/hooks/useCountryFlag";
import { FlagIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export function Flag({ countryCode }: { countryCode: string }) {
  const { flagUrl, error } = useCountryFlag(countryCode);

  if (error)
    return (
      <span className="text-gray-500">
        <FlagIcon size={13} />
      </span>
    );
  if (!flagUrl) return;

  return (
    <Image
      width={100}
      height={100}
      src={flagUrl}
      alt={`Flag of ${countryCode}`}
      className="h-6 w-6 rounded-full"
    />
  );
}
