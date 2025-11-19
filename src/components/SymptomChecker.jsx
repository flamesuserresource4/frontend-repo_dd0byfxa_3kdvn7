import { useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState(30);
  const [sex, setSex] = useState("unspecified");
  const [duration, setDuration] = useState(2);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/symptom-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age: Number(age), sex, symptoms: symptoms.split(",").map(s => s.trim()).filter(Boolean), duration_days: Number(duration) })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Failed to check symptoms" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <h2 className="text-white font-semibold text-xl mb-4">Symptom Checker</h2>
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-blue-200 text-sm mb-2">Describe your symptoms (comma-separated)</label>
          <input value={symptoms} onChange={(e)=>setSymptoms(e.target.value)} placeholder="fever, cough, sore throat" className="w-full bg-slate-900/60 text-white rounded-lg px-4 py-2 border border-slate-700 outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-blue-200 text-sm mb-2">Age</label>
          <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} className="w-full bg-slate-900/60 text-white rounded-lg px-4 py-2 border border-slate-700" />
        </div>
        <div>
          <label className="block text-blue-200 text-sm mb-2">Sex</label>
          <select value={sex} onChange={(e)=>setSex(e.target.value)} className="w-full bg-slate-900/60 text-white rounded-lg px-4 py-2 border border-slate-700">
            <option value="unspecified">Unspecified</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div>
          <label className="block text-blue-200 text-sm mb-2">Duration (days)</label>
          <input type="number" value={duration} onChange={(e)=>setDuration(e.target.value)} className="w-full bg-slate-900/60 text-white rounded-lg px-4 py-2 border border-slate-700" />
        </div>
        <div className="flex items-end">
          <button disabled={loading} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50">
            {loading ? "Checking..." : "Check"}
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-5 bg-slate-900/60 rounded-lg p-4 border border-slate-700">
          {result.error && <p className="text-red-300">{result.error}</p>}
          {result.likely_conditions && (
            <div>
              <div className="text-blue-200 text-sm mb-1">Risk level: <span className="uppercase font-semibold">{result.risk}</span></div>
              <ul className="list-disc list-inside text-white/90 space-y-1">
                {result.likely_conditions.map((c, i)=> (
                  <li key={i}><span className="font-medium">{c.condition}</span> — {c.advice}</li>
                ))}
              </ul>
              <p className="text-blue-300/80 text-sm mt-3">{result.guidance}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
