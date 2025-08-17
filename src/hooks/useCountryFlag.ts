import { useState, useEffect } from "react";

export function useCountryFlag(countryCode: string | null) {
  const [flagUrl, setFlagUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!countryCode) {
      setFlagUrl(null);
      return;
    }

    const code = countryCode.trim().toUpperCase();
    const url = `https://flagcdn.com/w20/${code.toLowerCase()}.png`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch flag for ${code}`);
        return res.blob();
      })
      .then((blob) => {
        setFlagUrl(URL.createObjectURL(blob));
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setFlagUrl(null);
      });

    // on cleanup, revoke the blob URL
    return () => {
      if (flagUrl) {
        URL.revokeObjectURL(flagUrl);
      }
    };
  }, [countryCode]);

  return { flagUrl, error };
}
