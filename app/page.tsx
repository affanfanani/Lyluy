"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Snowfall from "react-snowfall";

// Import komponen internal
import Hero from "./components/Hero";
import Message from "./components/Message";
import Playlist from "./components/Playlist";
import Moments from "./components/Moments";
import Footer from "./components/Footer";
import Countdown from "./components/Countdown";
import EntryGate from "./components/EntryGate";

// Definisi tahapan tampilan
type Stage = "LOADING" | "COUNTDOWN" | "INPUT" | "CONTENT";

export default function Home() {
  const [stage, setStage] = useState<Stage>("LOADING");

  useEffect(() => {
    const targetDate = new Date("2025-12-25T00:00:00").getTime();
    const now = new Date().getTime();
    const isUnlocked = localStorage.getItem("isUnlocked");

    if (isUnlocked === "true") {
      setStage("CONTENT");
    } else if (now >= targetDate) {
      setStage("INPUT");
    } else {
      setStage("COUNTDOWN");
    }
  }, []);

  // Fungsi memicu hujan confetti
  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#1DB954", "#ffffff", "#fbbf24"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#1DB954", "#ffffff", "#fbbf24"],
      });
    }, 250);
  };

  // Handler saat Countdown selesai
  const handleCountdownFinished = () => {
    setStage("INPUT");
  };

  // Handler saat EntryGate berhasil dibuka
  const handleUnlock = () => {
    localStorage.setItem("isUnlocked", "true");
    setStage("CONTENT");
    fireConfetti(); // Jalankan confetti sekilas
  };

  // Cegah flickering saat inisialisasi stage
  if (stage === "LOADING") {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen text-white relative overflow-hidden bg-[#121212]">
      {/* 1. STAGE: COUNTDOWN */}
      {stage === "COUNTDOWN" && (
        <Countdown onComplete={handleCountdownFinished} />
      )}

      {/* 2. STAGE: INPUT (ENTRY GATE) */}
      {stage === "INPUT" && <EntryGate onUnlock={handleUnlock} />}

      {/* 3. STAGE: CONTENT UTAMA */}
      {stage === "CONTENT" && (
        <div className="relative z-10 animate-fade-in">
          <div className="relative">
            <Snowfall />
            <Hero />
            <Message />
            <Playlist />
            <Moments />
            <Footer />
          </div>
        </div>
      )}
    </main>
  );
}
