import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CONFIG } from "../config.js";

function Brand() {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Hakiki home">
      <span className="grid size-10 place-items-center rounded-xl bg-[#e8f2ed] text-emerald-800">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 19 6v5c0 4.8-3 8.2-7 10-4-1.8-7-5.2-7-10V6l7-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>
      </span>
      <span className="leading-tight"><span className="block text-lg font-extrabold tracking-wide">HAKIKI</span><span className="block text-xs text-muted">MUT certificate verification</span></span>
    </Link>
  );
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const anchor = hash && document.getElementById(hash.slice(1));
    if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7f5]">
      <header className="border-b border-line/70 bg-white text-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Brand />
          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1">
            <Link to="/#services" className="rounded-lg px-3 py-2 text-sm font-semibold text-muted transition hover:bg-[#f4f8f5] hover:text-ink">For who</Link>
            <Link to="/#documents" className="rounded-lg px-3 py-2 text-sm font-semibold text-muted transition hover:bg-[#f4f8f5] hover:text-ink">Documents</Link>
            <Link to="/#how-it-works" className="rounded-lg px-3 py-2 text-sm font-semibold text-muted transition hover:bg-[#f4f8f5] hover:text-ink">How it works</Link>
            <Link to="/#faq" className="rounded-lg px-3 py-2 text-sm font-semibold text-muted transition hover:bg-[#f4f8f5] hover:text-ink">FAQ</Link>
            <Link to="/batch" className="ml-1 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-ink-2">Bulk check</Link>
          </nav>
        </div>
      </header>

      <div className="border-b border-line/60 bg-[#f4f8f5] px-4 py-2 text-center text-xs font-medium text-ink sm:text-sm">
        {CONFIG.institution} - Digital document verification
      </div>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-7 sm:px-6 sm:py-10"><Outlet /></main>

      <footer className="mt-8 border-t border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.2fr_0.7fr_1fr] lg:py-10">
          <div><Link to="/" className="text-sm font-extrabold tracking-[0.12em] text-ink">HAKIKI <span className="font-medium tracking-normal text-muted">/ MUT Verify</span></Link><p className="mt-3 max-w-sm text-xs leading-5 text-muted">A prototype for checking Murang'a University of Technology document fingerprints. Hakiki does not issue certificates.</p></div>
          <div><h2 className="text-xs font-extrabold uppercase tracking-wider text-ink">Explore</h2><div className="mt-3 grid gap-2 text-xs text-muted"><Link to="/verify" className="hover:text-emerald-800">Verify a document</Link><Link to="/batch" className="hover:text-emerald-800">Bulk verification</Link><Link to="/demo" className="hover:text-emerald-800">Sample records</Link></div></div>
          <div><h2 className="text-xs font-extrabold uppercase tracking-wider text-ink">Privacy & trust</h2><p className="mt-3 text-xs leading-5 text-muted">Personal details stay in the verification link. Only the document fingerprint is checked against the registry.</p></div>
        </div>
        <div className="border-t border-line/70"><div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6"><span>Murang'a University of Technology</span><span>Innovation week prototype</span></div></div>
      </footer>
    </div>
  );
}
