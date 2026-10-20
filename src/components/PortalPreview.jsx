import { Link } from "react-router-dom";

function MiniIcon({ kind, className = "size-6" }) {
  const attrs = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", className, "aria-hidden": true };
  const shape = {
    check: <><path d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    stack: <><rect x="4" y="3" width="14" height="16" rx="2"/><path d="M8 7h6M8 11h6M8 15h3M7 21h13a2 2 0 0 0 2-2V7"/></>,
    qr: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v2M17 20h4M20 18v3"/></>
  };
  return <svg {...attrs}>{shape[kind]}</svg>;
}

const SERVICE_LINKS = [
  { title: "Verify a document", text: "Scan a QR code or enter a verification link.", to: "/verify", icon: "check" },
  { title: "Bulk verification", text: "Check a set of document links and export results.", to: "/batch", icon: "stack" },
  { title: "Sample records", text: "Explore genuine, revoked and altered examples.", to: "/demo", icon: "qr" }
];

export default function PortalPreview() {
  return (
    <section aria-label="Hakiki platform preview" className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-[#e3e9e5] bg-white text-left shadow-[0_24px_70px_-35px_rgba(16,48,43,0.38)] sm:mt-16">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8ede9] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5"><span className="grid size-8 place-items-center rounded-lg bg-[#e7f2ec] text-emerald-800"><MiniIcon kind="check" className="size-5" /></span><span className="text-sm font-extrabold tracking-wide">HAKIKI <span className="font-normal text-muted">/ Certificate services</span></span></div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#f4f8f5] px-3 py-1 text-[11px] font-semibold text-muted"><span className="size-1.5 rounded-full bg-emerald-600" /> Public verification</span>
      </div>
      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_260px] lg:p-7">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-800">MURANG'A UNIVERSITY OF TECHNOLOGY</p>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">A clear result, without the wait.</h2>
          <p className="mt-1 text-sm text-muted">Select a service to get started.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {SERVICE_LINKS.map(service => <Link key={service.title} to={service.to} className="group relative min-h-[142px] overflow-hidden rounded-xl bg-[#0c8651] p-4 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#087448] hover:shadow-md">
              <span className="grid size-9 place-items-center rounded-lg bg-white/15"><MiniIcon kind={service.icon} className="size-5" /></span>
              <span className="mt-3 block text-sm font-bold">{service.title}</span>
              <span className="mt-1 block max-w-[22ch] text-xs leading-5 text-white/80">{service.text}</span>
              <span aria-hidden="true" className="absolute bottom-3 right-3 text-lg text-white/60">&rarr;</span>
            </Link>)}
          </div>
          <div className="mt-4 rounded-xl border border-[#e8ede9] bg-[#fafcfb] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-sm font-bold">A verification in three steps</h3><Link to="/#how-it-works" className="text-xs font-semibold text-emerald-800 hover:underline">How it works &rarr;</Link></div>
            <div className="mt-3 grid gap-3 text-xs text-muted sm:grid-cols-3"><p><b className="text-ink">01</b><span className="ml-2">Scan or paste the link</span></p><p><b className="text-ink">02</b><span className="ml-2">Compare the fingerprint</span></p><p><b className="text-ink">03</b><span className="ml-2">Read the result</span></p></div>
          </div>
        </div>
        <aside className="space-y-3">
          <div className="rounded-xl bg-[#eff6f2] p-4">
            <h3 className="text-sm font-bold">At a glance</h3>
            <ul className="mt-3 space-y-3 text-xs leading-5 text-muted"><li className="flex gap-2"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-700" />No account needed to verify</li><li className="flex gap-2"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-700" />Personal details stay out of the blockchain record</li><li className="flex gap-2"><span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-700" />Bulk results can be saved as CSV</li></ul>
          </div>
          <div className="rounded-xl border border-[#e8ede9] p-4"><div className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#b8862b]" /><h3 className="text-xs font-bold">A result is a record check</h3></div><p className="mt-2 text-xs leading-5 text-muted">A genuine result confirms matching details. Check the presenter's identity separately.</p></div>
        </aside>
      </div>
    </section>
  );
}
