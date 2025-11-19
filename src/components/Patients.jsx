import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function Patients() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE}/api/patients`);
    const data = await res.json();
    setList(data);
    setLoading(false);
  };

  useEffect(()=>{ load(); },[]);

  const add = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/patients`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ name, email, phone })
    });
    await res.json();
    setName(""); setEmail(""); setPhone("");
    load();
  };

  return (
    <div id="patients" className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-6">
      <h2 className="text-white font-semibold text-xl mb-4">Patients</h2>
      <form onSubmit={add} className="grid sm:grid-cols-3 gap-3 mb-4">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="bg-slate-900/60 text-white rounded-lg px-3 py-2 border border-slate-700" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="bg-slate-900/60 text-white rounded-lg px-3 py-2 border border-slate-700" />
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" className="bg-slate-900/60 text-white rounded-lg px-3 py-2 border border-slate-700" />
        <div className="sm:col-span-3">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">Add Patient</button>
        </div>
      </form>
      {loading ? (
        <p className="text-blue-200">Loading...</p>
      ) : (
        <ul className="divide-y divide-slate-700">
          {list.map(p => (
            <li key={p._id} className="py-2 flex items-center justify-between">
              <div>
                <div className="text-white font-medium">{p.name}</div>
                <div className="text-blue-300/70 text-sm">{p.email || "-"} • {p.phone || "-"}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
