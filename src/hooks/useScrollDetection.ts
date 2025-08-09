// hooks/useScrollDetection.ts
import { useState, useEffect } from "react";

const useScrollDetection = (triggerHeight = 2) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      setIsScrolled(window.scrollY >= triggerHeight);
    };

    checkScrollPosition();
    window.addEventListener("scroll", checkScrollPosition);
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, [triggerHeight]);

  return isScrolled;
};

export default useScrollDetection;
