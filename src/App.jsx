import { useRef } from "react";
import Hero from "./components/Hero";
import SymptomChecker from "./components/SymptomChecker";
import Patients from "./components/Patients";
import Appointments from "./components/Appointments";

function App() {
  const topRef = useRef(null);
  return (
    <div ref={topRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]" />
      <div className="relative max-w-5xl mx-auto p-6 md:p-10 space-y-8">
        <Hero onStart={() => {
          const el = document.getElementById("symptom");
          el?.scrollIntoView({ behavior: "smooth" });
        }} />

        <section id="symptom">
          <SymptomChecker />
        </section>

        <section>
          <Patients />
        </section>

        <section>
          <Appointments />
        </section>

        <footer className="text-center pt-8 pb-4 text-blue-300/70 text-sm">
          This assistant does not provide medical diagnosis. For emergencies, call local emergency services.
        </footer>
      </div>
    </div>
  );
}

export default App;
