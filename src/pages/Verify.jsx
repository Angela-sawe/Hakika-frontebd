import { useCallback, useEffect, useMemo, useState } from "react";
import ResultCard from "../components/ResultCard.jsx";
import QrScanner from "../components/QrScanner.jsx";
import { encodePayload } from "../lib/payload.js";
import { verifyLink } from "../lib/verify.js";

const normalise = value => String(value ?? "").normalize("NFC").toLowerCase().replace(/\s+/g, " ").trim();

export default function Verify() {
  const [hash, setHash] = useState(() => window.location.hash);
  const [state, setState] = useState({ phase: "idle" });
  const [linkText, setLinkText] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scanError, setScanError] = useState("");
  const [paperText, setPaperText] = useState("");
  const [paperResult, setPaperResult] = useState(null);
  const demoMode = useMemo(() => new URLSearchParams(window.location.search).get("demo") === "1", []);
  const mockMode = useMemo(() => new URLSearchParams(window.location.search).get("mock") === "1", []);

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  useEffect(() => {
    setPaperResult(null);
    if (hash.length < 2) { setState({ phase: "idle" }); return; }
    let active = true;
    setState({ phase: "loading" });
    verifyLink(hash.slice(1), { mock: mockMode }).then(result => {
      if (active) setState({ phase: "done", result });
    });
    return () => { active = false; };
  }, [hash, mockMode]);

  const submit = useCallback(raw => {
    const marker = raw.indexOf("#");
    setScannerOpen(false);
    if (marker < 0 || !raw.slice(marker + 1)) {
      setScanError("That QR code is not a Hakika document.");
      return;
    }
    setScanError("");
    window.location.hash = raw.slice(marker + 1);
  }, []);

  function checkPaper() {
    const payload = state.result?.payload;
    if (!payload || !paperText.trim()) return;
    const entered = normalise(paperText);
    const matches = entered === normalise(payload.name) || entered === normalise(payload.regNo);
    setPaperResult(matches ? "matches" : "no-match");
  }

  function tamperAndRecheck() {
    const payload = state.result?.payload;
    if (!payload) return;
    const name = payload.name;
    const last = name.slice(-1);
    const changed = `${name.slice(0, -1)}${last.toLowerCase() === "a" ? "o" : "a"}`;
    window.location.hash = encodePayload({ ...payload, name: changed });
  }

  const done = state.phase === "done";
  const positive = done && (state.result.status === "genuine" || state.result.status === "revoked");

  return <div className="mx-auto max-w-3xl space-y-6">
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Document services / Verification</p>
      <h1 className="mt-1 text-3xl font-extrabold tracking-tight">Verify a MUT document</h1>
      <p className="mt-2 text-muted">{hash.length < 2 ? "Scan a document's QR code to begin, or paste its verification link." : "This certificate is being checked against the public registry."}</p>
    </div>

    {state.phase === "loading" && <div aria-live="polite" role="status" className="rounded-2xl border border-line bg-white p-8 text-center text-muted">Checking...</div>}
    {done && <>
      <ResultCard result={state.result} />
      {positive && <section className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-lg font-bold">Check against the paper</h2>
        <p className="mt-1 text-sm text-muted">Type the name or registration number printed on the document you are holding.</p>
        <form onSubmit={event => { event.preventDefault(); checkPaper(); }} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="paper-value">Name or registration number on the document</label>
          <input id="paper-value" value={paperText} onChange={event => { setPaperText(event.target.value); setPaperResult(null); }} className="min-h-11 min-w-0 flex-1 rounded-xl border border-line bg-[#f8faf9] px-3 py-2 text-base" placeholder="Name or registration number" />
          <button type="submit" className="min-h-11 rounded-xl bg-ink px-5 py-2.5 text-sm font-bold text-white hover:bg-ink-2">Check</button>
        </form>
        {paperResult && <p role="status" className={`mt-3 rounded-xl p-3 text-sm font-bold ${paperResult === "matches" ? "bg-[#e8f4ec] text-ok" : "bg-[#fff0ef] text-bad"}`}>
          {paperResult === "matches" ? "MATCHES — What you typed matches this record." : "DOES NOT MATCH — The document in your hand does not match this record. Do not accept it."}
        </p>}
      </section>}
      {demoMode && positive && <button type="button" onClick={tamperAndRecheck} className="min-h-11 rounded-xl border border-line bg-white px-4 py-2 text-sm font-bold hover:bg-field">Demo: change one letter and re-check</button>}
    </>}

    <section className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-7">
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f2ed] text-ink"><svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v6h5M9 14h6M9 17h6"/></svg></span>
        <div><h2 className="text-lg font-bold">{done ? "Check another document" : "Scan or enter a link"}</h2><p className="mt-0.5 text-sm text-muted">Document details in the link stay in your browser. Only the fingerprint is sent to the blockchain.</p></div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => { setScanError(""); setScannerOpen(value => !value); }} className="min-h-11 rounded-xl bg-ink px-4 py-2.5 text-sm font-bold text-white hover:bg-ink-2">{scannerOpen ? "Close scanner" : "Open scanner"}</button>
      </div>
      {scannerOpen && <QrScanner onResult={submit} onClose={() => setScannerOpen(false)} />}
      {scanError && <p role="status" className="mt-3 text-sm font-semibold text-bad">{scanError}</p>}

      <form className="mt-5 border-t border-line pt-4" onSubmit={event => { event.preventDefault(); submit(linkText); }}>
        <label htmlFor="verify-link" className="block text-xs font-bold uppercase tracking-wider text-muted">Paste the verification link</label>
        <textarea id="verify-link" rows={3} value={linkText} onChange={event => setLinkText(event.target.value)} placeholder="https://.../verify#..." className="mt-2 w-full rounded-xl border border-line bg-[#f8faf9] p-3 font-mono text-sm" />
        <button type="submit" disabled={!linkText.trim()} className="mt-3 min-h-11 rounded-xl border border-line px-5 py-2.5 text-sm font-bold hover:bg-field disabled:cursor-not-allowed disabled:opacity-45">Verify link</button>
      </form>
    </section>

    <p className="text-center text-xs leading-5 text-muted">Records are checked directly on the Avalanche Fuji (test network). No personal data is stored on the blockchain.</p>
  </div>;
}
