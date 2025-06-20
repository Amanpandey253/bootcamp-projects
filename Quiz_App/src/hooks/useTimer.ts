import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialTime: number, onTimeUp?: () => void) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, onTimeUp]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = (newTime?: number) => {
    setIsRunning(false);
    setTimeRemaining(newTime ?? initialTime);
  };

  return {
    timeRemaining,
    isRunning,
    start,
    pause,
    reset
  };
};