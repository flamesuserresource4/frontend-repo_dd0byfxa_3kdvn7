import { useState } from "react";

export default function Hero({ onStart }) {
  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">AI Health Assistant</h1>
      <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
        Check symptoms, manage appointments, and keep simple health notes. This MVP uses a
        privacy-friendly rules engine. No external AI keys needed.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button onClick={onStart} className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition">
          Try Symptom Checker
        </button>
        <a href="#appointments" className="px-5 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition">
          Manage Appointments
        </a>
      </div>
    </div>
  );
}
