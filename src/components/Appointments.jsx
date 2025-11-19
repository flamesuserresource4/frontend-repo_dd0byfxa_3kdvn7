import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function Appointments() {
  const [patients, setPatients] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [patientId, setPatientId] = useState("");
  const [datetime, setDatetime] = useState("");
  const [reason, setReason] = useState("");

  const load = async () => {
    setLoading(true);
    const [pRes, aRes] = await Promise.all([
      fetch(`${API_BASE}/api/patients`),
      fetch(`${API_BASE}/api/appointments`),
    ]);
    setPatients(await pRes.json());
    setItems(await aRes.json());
    setLoading(false);
  };

  useEffect(()=>{ load(); },[]);

  const add = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/appointments`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ patient_id: patientId, datetime: new Date(datetime).toISOString(), reason, status: "scheduled" })
    });
    await res.json();
    setPatientId(""); setDatetime(""); setReason("");
    load();
  };

  const patientById = useMemo(() => Object.fromEntries(patients.map(p=>[p._id,p])), [patients]);

  return (
    <div id="appointments" className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <h2 className="text-white font-semibold text-xl mb-4">Appointments</h2>
      <form onSubmit={add} className="grid md:grid-cols-4 gap-3 mb-4">
        <select value={patientId} onChange={e=>setPatientId(e.target.value)} className="bg-slate-900/60 text-white rounded-lg px-3 py-2 border border-slate-700">
          <option value="">Select patient</option>
          {patients.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
        <input type="datetime-local" value={datetime} onChange={e=>setDatetime(e.target.value)} className="bg-slate-900/60 text-white rounded-lg px-3 py-2 border border-slate-700" />
        <input value={reason} onChange={e=>setReason(e.target.value)} placeholder="Reason" className="bg-slate-900/60 text-white rounded-lg px-3 py-2 border border-slate-700" />
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">Create</button>
      </form>
      {loading ? (
        <p className="text-blue-200">Loading...</p>
      ) : (
        <ul className="divide-y divide-slate-700">
          {items.map(a => (
            <li key={a._id} className="py-2">
              <div className="text-white font-medium">{patientById[a.patient_id]?.name || a.patient_id} — {new Date(a.datetime).toLocaleString()}</div>
              <div className="text-blue-300/70 text-sm">{a.reason} • {a.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
