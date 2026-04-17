"use client";

import { useState } from "react";

interface EntryGateProps {
  onUnlock: () => void;
}

export default function EntryGate({ onUnlock }: EntryGateProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const KataKunci = "Ghaly";
    
    if (name.trim().toLowerCase() === KataKunci.toLowerCase()) {
      onUnlock();
    } else {
      setError("Salah woii, yang serius dongg! 🙄");
      setTimeout(() => setError(""), 2000);
    }
  };

return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-[#121212]">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-righteous mb-3">Masukkan kata sandi</h2>
          <p className="font-jersey text-sm opacity-40 tracking-wide">Clue nya nama cowo tertampan</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <input
              type="text"
              placeholder="G_____"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full bg-transparent border-b-2 ${error ? 'border-red-500' : 'border-white/10'} py-3 px-1 text-center text-2xl font-righteous focus:outline-none focus:border-[#1DB954] transition-all placeholder:opacity-10`}
            />
            {error && <p className="text-red-500 text-[10px] font-jersey mt-2 text-center uppercase tracking-widest">{error}</p>}
          </div>

          <button 
            type="submit"
            className="w-full py-4 text-xs font-jersey tracking-[0.3em] border border-white/20 hover:bg-white hover:text-black transition-all duration-500 uppercase"
          >
          </button>
        </form>
      </div>
    </div>
  );
}