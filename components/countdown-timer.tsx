import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: string; // ISO string
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const { days, hours, minutes, seconds } = timeLeft;
  const isFinished = +new Date(targetDate) - +new Date() <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 text-center text-white shadow-md"
    >
      {isFinished ? (
        <span className="text-amber-400 font-bold">Live Now 🚀</span>
      ) : (
        <span className="text-sm font-mono">
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      )}
    </motion.div>
  );
}
