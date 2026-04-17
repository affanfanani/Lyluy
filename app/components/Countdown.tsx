"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  onComplete: () => void;
}

export default function Countdown({ onComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date("2025-12-25T00:00:00").getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        onComplete();
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4 bg-[#121212]">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="font-jersey text-sm tracking-[0.4em] uppercase opacity-40 mb-2">
          Coming Soon
        </h1>
        <h2 className="text-5xl md:text-7xl font-righteous tracking-tighter">
          17 <span className="text-[#1DB954]">.</span> 4{" "}
          <span className="text-[#1DB954]">.</span> 26
        </h2>
      </div>

      <div className="flex gap-6 md:gap-12">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="flex flex-col items-center">
            <span className="text-5xl md:text-8xl font-righteous tabular-nums tracking-tighter">
              {String(value).padStart(2, "0")}
            </span>
            <span className="font-jersey text-[10px] md:text-xs uppercase mt-2 tracking-[0.3em] opacity-30">
              {label === "days"
                ? "Days"
                : label === "hours"
                  ? "Hours"
                  : label === "minutes"
                    ? "Mins"
                    : "Secs"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-20 font-jersey text-sm opacity-20 tracking-widest">
        Ditunggu aja
      </div>
    </div>
  );
}
