import { Link } from "react-router-dom";

const STEPS = [
  { number: "01", title: "Scan or paste", copy: "Use your phone camera to scan the QR code, or paste the certificate's verification link into the checker.", label: "Single document" },
  { number: "02", title: "Compare the record", copy: "Hakiki rebuilds the document fingerprint in your browser and checks its registration status.", label: "Automated check" },
  { number: "03", title: "Understand the result", copy: "Genuine means a match. Revoked means withdrawn. Not verified means details do not match a registered record.", label: "Clear outcome" }
];

export default function HowToUse() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="scroll-mt-24 rounded-3xl border border-[#dce8e0] bg-[#eff6f1] px-5 py-8 sm:px-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[0.17em] text-emerald-800">From QR to answer</p><h2 id="how-it-works-title" className="mt-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Trust the record.<br className="hidden sm:block" />See how it works.</h2><p className="mt-3 max-w-sm text-sm leading-6 text-muted">No account or special software is needed for a basic document check.</p><Link to="/verify" className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-ink-2">Check a document <span aria-hidden="true">&rarr;</span></Link></div>
        <ol className="grid gap-3 sm:grid-cols-3">
          {STEPS.map(step => <li key={step.number} className="rounded-2xl border border-white bg-white p-4 shadow-sm sm:p-5"><div className="flex items-center justify-between"><span className="text-2xl font-extrabold tracking-tight text-emerald-800">{step.number}</span><span className="rounded-full bg-[#eff6f1] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-900">{step.label}</span></div><h3 className="mt-5 text-base font-bold">{step.title}</h3><p className="mt-2 text-xs leading-5 text-muted">{step.copy}</p></li>)}
        </ol>
      </div>
    </section>
  );
}
