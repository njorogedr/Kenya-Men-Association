import { useEffect, useState } from 'react';

function getTimeLeft(targetDate) {
  const difference = targetDate.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    isExpired: false,
  };
}

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(new Date(targetDate)));

  useEffect(() => {
    const updateCountdown = () => setTimeLeft(getTimeLeft(new Date(targetDate)));
    updateCountdown();

    const timer = window.setInterval(updateCountdown, 30000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
