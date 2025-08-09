"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

type Settings = {
  currency: string;
  currencyCode: string;
  currencyLabel: string;
  areaUnit: string;
  areaUnitValue: string;
};

type Formatters = {
  formatCurrency: (price: number) => string;
  formatArea: (area: number) => string;
};

export function useAppSettings(): Settings &
  Formatters & { updateSettings: (newSettings: Partial<Settings>) => void } {
  const [isMounted, setIsMounted] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    currency: "ج.م",
    currencyCode: "EGP",
    currencyLabel: "جنيه مصري",
    areaUnit: "متر مربع",
    areaUnitValue: "م²",
  });

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("appSettings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings((prev) => ({
          ...prev,
          ...parsed,
          currencyLabel: parsed.currencyLabel || "جنيه مصري",
          areaUnitValue: parsed.areaUnitValue || "م²",
        }));
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("appSettings", JSON.stringify(settings));
  }, [settings, isMounted]);

  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const formatters = useMemo<Formatters>(() => {
    return {
      formatCurrency: (price: number) => {
        if (!isMounted) return `${price} ${settings.currency}`;
        try {
          // Format number in English (en-US) but keep Arabic currency symbol
          const formattedNumber = new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 0,
          }).format(price);

          return `${formattedNumber} ${settings.currency}`;
        } catch (e) {
          console.log(e);
          // Fallback to English formatting if Intl fails
          return `${price.toLocaleString("en-US")} ${settings.currency}`;
        }
      },
      formatArea: (area: number) => {
        // Keep area formatting in Arabic as before
        return `${area.toLocaleString("ar-EG", {
          maximumFractionDigits: 2,
        })} ${settings.areaUnitValue || settings.areaUnit}`;
      },
    };
  }, [settings, isMounted]);

  return {
    ...settings,
    ...formatters,
    updateSettings,
  };
}
