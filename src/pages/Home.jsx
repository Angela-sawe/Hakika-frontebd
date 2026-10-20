import { Link } from "react-router-dom";
import { CONFIG } from "../config.js";
import PortalPreview from "../components/PortalPreview.jsx";
import HowToUse from "../components/HowToUse.jsx";
import Faq from "../components/Faq.jsx";

const STAKEHOLDERS = [
  {
    number: "01",
    title: "Students & graduates",
    lead: "Give the people reviewing your document a direct way to check it.",
    points: ["Share the QR code printed on your document", "Send the verification link digitally", "See what a checker will see before you share"],
    to: "/demo",
    action: "Preview a verification"
  },
  {
    number: "02",
    title: "Employers & institutions",
    lead: "Check an individual document or review a list of candidates efficiently.",
    points: ["Check a single QR code or link", "Review multiple links in one batch", "Export the results table as a CSV"],
    to: "/batch",
    action: "Open verifier tools"
  }
];

const FEATURES = [
  { number: "01", title: "Check the record", text: "Rebuild the document fingerprint and compare it with the registry record.", icon: "fingerprint" },
  { number: "02", title: "Keep details private", text: "The document details stay in the link fragment and are checked in your browser.", icon: "privacy" },
  { number: "03", title: "Read clear outcomes", text: "See whether a record is genuine, revoked, unmatched or could not be checked.", icon: "result" },
  { number: "04", title: "Review in bulk", text: "Check many links together and export a CSV for your follow-up.", icon: "bulk" }
];

const DOCUMENTS = [
  { label: "Degree certificates", detail: "Confirm a qualification record against its registered fingerprint.", code: "DEGREE", icon: "degree" },
  { label: "Academic transcripts", detail: "Check that the supplied academic record matches its registered details.", code: "TRANSCRIPT", icon: "transcript" },
  { label: "Clearance forms", detail: "Verify a clearance record using the document's QR link.", code: "CLEARANCE", icon: "clearance" }
];

function LineIcon({ kind, className = "size-6" }) {
  const attrs = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.65, strokeLinecap: "round", strokeLinejoin: "round", className, "aria-hidden": true };
  const shapes = {
    fingerprint: <><path d="M12 11a2 2 0 0 0-2 2c0 2-.3 4-1 5.5M12 7a6 6 0 0 0-6 6c0 3-.6 5.3-1.5 7M12 3a10 10 0 0 0-10 10M12 3a10 10 0 0 1 10 10c0 2-.2 4-.8 5.8M12 7a6 6 0 0 1 6 6c0 3-.3 5.5-1 7.5M12 11a2 2 0 0 1 2 2c0 2.4-.2 4.4-.6 6.1"/></>,
    privacy: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
    result: <><path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    bulk: <><rect x="4" y="3" width="14" height="17" rx="2"/><path d="M8 8h6M8 12h6M8 16h3M8 21h12a2 2 0 0 0 2-2V7"/></>,
    degree: <><path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v6"/></>,
    transcript: <><path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M8 12h8M8 16h8"/></>,
    clearance: <><path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z"/><path d="M12 8v5M12 16h.01"/></>
  };
  return <svg {...attrs}>{shapes[kind]}</svg>;
}

function CertificateArtwork() {
  return (
    <div className="relative mx-auto w-full max-w-[480px] px-3 py-7 sm:px-7 sm:py-10">
      <div aria-hidden="true" className="absolute inset-3 rounded-[2rem] bg-[#b6d0be] blur-2xl opacity-40" />
      <div className="relative rotate-[1.5deg] rounded-[1.35rem] border border-white/75 bg-[#fffefa] p-5 shadow-[0_26px_70px_-28px_rgba(0,0,0,0.4)] sm:p-7">
        <div className="absolute inset-3 rounded-[1rem] border border-[#d8e3d9]" />
        <div className="relative flex items-start justify-between gap-2">
          <div className="flex items-center gap-2"><span className="grid size-10 place-items-center rounded-full bg-ink text-white"><LineIcon kind="degree" className="size-6" /></span><div><p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-ink sm:text-[10px]">Murang'a University</p><p className="text-[9px] font-medium text-muted sm:text-[10px]">of Technology</p></div></div>
          <span className="rounded-full border border-emerald-700/20 bg-emerald-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-800">Digital record</span>
        </div>
        <div className="relative my-6 border-y border-[#e6eae4] py-6 text-center sm:my-8 sm:py-8">
          <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9a702e]">Academic credential</p>
          <p className="mt-3 font-serif text-2xl text-ink sm:text-3xl">A record worth verifying</p>
          <p className="mx-auto mt-2 max-w-[32ch] text-[10px] leading-5 text-muted sm:text-xs">Every detail can be checked against its registered fingerprint.</p>
          <div className="mx-auto mt-5 h-px w-20 bg-[#b8862b]" />
        </div>
        <div className="relative flex items-end justify-between gap-4">
          <div className="min-w-0"><p className="text-[8px] font-bold uppercase tracking-[0.14em] text-muted">Verification fingerprint</p><p className="mt-1 truncate font-mono text-[9px] text-ink sm:text-[10px]">0x8f2a...c91d</p><div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#e9f5ed] px-2.5 py-1 text-[9px] font-bold text-emerald-800"><span className="size-1.5 rounded-full bg-emerald-600" /> Ready to verify</div></div>
          <div className="grid size-[62px] shrink-0 grid-cols-5 grid-rows-5 gap-[2px] rounded-md border border-[#e1e7e2] bg-white p-1.5 sm:size-[76px] sm:gap-[3px] sm:p-2" aria-hidden="true">{Array.from({ length: 25 }, (_, i) => <span key={i} className={`rounded-[1px] ${(i * 7 + i * i) % 5 < 2 || [0, 1, 2, 5, 10, 14, 19, 20, 22, 24].includes(i) ? "bg-ink" : "bg-transparent"}`} />)}</div>
        </div>
      </div>
      <div className="absolute -bottom-1 left-0 flex items-center gap-2 rounded-xl border border-[#e5ebe6] bg-white px-3 py-2.5 shadow-lg sm:left-2 sm:px-4"><span className="grid size-8 place-items-center rounded-full bg-[#e9f5ed] text-emerald-800"><LineIcon kind="result" className="size-5" /></span><span><span className="block text-[9px] font-bold text-muted">INTEGRITY CHECK</span><span className="block text-xs font-extrabold text-ink">One scan. Clear answer.</span></span></div>
    </div>
  );
}

function SectionLabel({ children }) {
  return <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-emerald-800">{children}</p>;
}

function StakeholderSection() {
  return (
    <section id="services" aria-labelledby="stakeholders-title" className="scroll-mt-24 grid gap-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-14">
      <div><SectionLabel>One service, two perspectives</SectionLabel><h2 id="stakeholders-title" className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Built around the people who rely on a document.</h2><p className="mt-4 max-w-xl text-base leading-7 text-muted">Give graduates a simple way to share their records, and give reviewers a dependable way to check them.</p><Link to="/verify" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:underline">See verification options <span aria-hidden="true">&rarr;</span></Link></div>
      <div className="grid gap-4 md:grid-cols-2">
        {STAKEHOLDERS.map(persona => <article key={persona.number} className="relative overflow-hidden rounded-2xl border border-[#e4ebe6] bg-white p-5 shadow-sm sm:p-6"><span className="absolute right-4 top-3 text-5xl font-black tracking-tighter text-[#eff4f0]">{persona.number}</span><div className="relative"><h3 className="text-lg font-extrabold">{persona.title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-muted">{persona.lead}</p><ul className="mt-4 space-y-2.5">{persona.points.map(point => <li key={point} className="flex gap-2.5 text-xs leading-5 text-ink"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#b8862b]" />{point}</li>)}</ul><Link to={persona.to} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:underline">{persona.action}<span aria-hidden="true">&rarr;</span></Link></div></article>)}
      </div>
    </section>
  );
}

function FeatureSection() {
  return (
    <section aria-labelledby="features-title" className="overflow-hidden rounded-3xl bg-ink px-5 py-9 text-white sm:px-8 sm:py-11">
      <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-end"><div><SectionLabel>Core features</SectionLabel><h2 id="features-title" className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Academic trust, made practical.</h2></div><p className="max-w-2xl text-sm leading-6 text-white/70">Hakiki gives people a fast, understandable way to check records while keeping verification details out of the on-chain data.</p></div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{FEATURES.map(feature => <article key={feature.number} className="rounded-xl border border-white/10 bg-white/[0.06] p-4 sm:p-5"><div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-[#d7e8db] text-ink"><LineIcon kind={feature.icon} /></span><span className="text-xs font-bold tracking-widest text-[#c5a36a]">{feature.number}</span></div><h3 className="mt-5 font-bold">{feature.title}</h3><p className="mt-2 text-xs leading-5 text-white/70">{feature.text}</p></article>)}</div>
    </section>
  );
}

function DocumentSection() {
  return (
    <section id="documents" aria-labelledby="documents-title" className="scroll-mt-24">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><SectionLabel>Academic records</SectionLabel><h2 id="documents-title" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">One trusted way to check MUT documents.</h2></div><p className="max-w-md text-sm leading-6 text-muted">Document type comes from the verification link. Hakiki checks its fingerprint against the record and reports the result.</p></div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{DOCUMENTS.map((document, index) => <article key={document.code} className={`group relative overflow-hidden rounded-2xl border border-[#e4ebe6] p-5 sm:p-6 ${index === 1 ? "bg-[#f0f6f2]" : "bg-white"}`}><span className="absolute -right-3 -top-5 text-[5rem] font-black leading-none text-ink/[0.035]">{String(index + 1).padStart(2, "0")}</span><span className="relative grid size-11 place-items-center rounded-xl bg-[#e9f2ec] text-emerald-800"><LineIcon kind={document.icon} /></span><h3 className="relative mt-5 text-lg font-extrabold">{document.label}</h3><p className="relative mt-2 min-h-12 text-sm leading-6 text-muted">{document.detail}</p><div className="relative mt-5 flex items-center justify-between border-t border-[#e4ebe6] pt-4"><span className="font-mono text-[10px] font-bold tracking-wider text-muted">{document.code}</span><Link to="/verify" className="grid size-8 place-items-center rounded-full bg-ink text-white transition group-hover:bg-emerald-700" aria-label={`Verify ${document.label}`}><span aria-hidden="true">&rarr;</span></Link></div></article>)}</div>
      <p className="mt-4 text-xs leading-5 text-muted">Hakiki checks existing records. It does not create, issue or download certificates.</p>
    </section>
  );
}

function RecordsBanner() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-[#e5e9df] bg-[#f7f4ea] px-5 py-8 sm:px-9 sm:py-10">
      <div aria-hidden="true" className="absolute -right-10 -top-12 -z-10 size-64 rounded-full border border-[#d5c59e]/50 sm:size-80" /><div aria-hidden="true" className="absolute -right-1 -top-3 -z-10 size-48 rounded-full border border-[#d5c59e]/50 sm:size-64" />
      <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center"><div><SectionLabel>Evidence over paperwork</SectionLabel><h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">A document should be easy to trust, wherever it travels.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted">Instead of relying only on a visual inspection, check the digital fingerprint linked to the record. A change to the verified details changes the fingerprint.</p></div><div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end"><span className="rounded-full border border-[#dfd4b7] bg-white/70 px-3 py-2 text-xs font-semibold text-ink">QR linked</span><span className="rounded-full border border-[#dfd4b7] bg-white/70 px-3 py-2 text-xs font-semibold text-ink">Tamper evident</span><span className="rounded-full border border-[#dfd4b7] bg-white/70 px-3 py-2 text-xs font-semibold text-ink">Privacy minded</span></div></div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="space-y-16 pb-6 sm:space-y-24">
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-[#f4f7f2] px-5 py-9 sm:px-9 sm:py-12 lg:px-12 lg:py-10">
        <div aria-hidden="true" className="absolute -right-36 -top-24 -z-10 size-[34rem] rounded-full bg-[#e6eee5]" />
        <div aria-hidden="true" className="absolute -right-24 -top-10 -z-10 size-[27rem] rounded-full border border-white/80" />
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="py-2 lg:py-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dce8de] bg-white/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-900"><span className="size-2 rounded-full bg-emerald-600" />{CONFIG.useMock ? "Interactive prototype" : "MUT document verification"}</div>
            <h1 className="mt-5 max-w-2xl text-[2.65rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#12201a] sm:text-6xl lg:text-[4.15rem]">Proof that stands up to <span className="text-emerald-800">scrutiny.</span></h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">A more dependable way to verify Murang'a University of Technology documents, for graduates and the people who review them.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Link to="/verify" className="rounded-full bg-[#111b16] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-900">Verify a document <span aria-hidden="true" className="ml-1">&rarr;</span></Link><Link to="/batch" className="rounded-full border border-[#d4dfd6] bg-white/80 px-6 py-3 text-sm font-bold text-ink transition hover:border-emerald-700 hover:bg-white">For organizations</Link></div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-muted"><span className="inline-flex items-center gap-2"><span className="size-1.5 rounded-full bg-emerald-700" />No account to check</span><span className="inline-flex items-center gap-2"><span className="size-1.5 rounded-full bg-emerald-700" />QR or link</span><span className="inline-flex items-center gap-2"><span className="size-1.5 rounded-full bg-emerald-700" />Browser-side check</span></div>
          </div>
          <CertificateArtwork />
        </div>
        <div className="mt-4 border-t border-[#dce5dc] pt-4"><div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start"><span className="mr-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-muted">Check MUT records</span>{DOCUMENTS.map(doc => <Link key={doc.code} to="/verify" className="rounded-full border border-[#dce5dc] bg-white/75 px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-emerald-700">{doc.label}</Link>)}</div></div>
      </section>

      <PortalPreview />
      <StakeholderSection />
      <FeatureSection />
      <DocumentSection />
      <RecordsBanner />
      <HowToUse />
      <Faq />

      <section className="rounded-3xl bg-[#0f2923] px-6 py-8 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-9 sm:py-9"><div><p className="text-xs font-bold uppercase tracking-[0.17em] text-[#a9c9b0]">Ready to check a record?</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Start with a QR code or link.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-white/70">Get an immediate result, or explore the sample records to see how it works.</p></div><div className="mt-5 flex shrink-0 flex-wrap gap-3 sm:mt-0"><Link to="/verify" className="rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:bg-[#eaf3ec]">Verify a document</Link><Link to="/demo" className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">View demo</Link></div></section>
    </div>
  );
}
