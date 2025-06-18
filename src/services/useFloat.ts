import { useState, useEffect } from 'react';

export const useFloat = () => {
  const [floatCount, setFloatCount] = useState(0);
  const [shouldFloat, setShouldFloat] = useState(true);

  // Initial floating animation - 3 times
  useEffect(() => {
    const timer = setTimeout(() => {
      setFloatCount(prev => {
        if (prev < 2) {
          return prev + 1;
        } else {
          setShouldFloat(false);
          return prev;
        }
      });
    }, 6000);

    return () => clearTimeout(timer);
  }, [floatCount]);

  const triggerFloat = () => {
    setShouldFloat(true);
    setFloatCount(0);
  };

  return {
    shouldFloat: shouldFloat && floatCount < 3,
    triggerFloat
  };
};