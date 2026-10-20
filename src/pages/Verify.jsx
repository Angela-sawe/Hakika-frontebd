import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultCard from "../components/ResultCard.jsx";
import QrScanner from "../components/QrScanner.jsx";
import { verifyLink } from "../lib/verify.js";

// QR links open this page as /verify#<details>. Whenever the part after # changes, we re-check.
export default function Verify() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState({ phase: "idle" });
  const [text, setText] = useState("");
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (hash.length < 2) { setState({ phase: "idle" }); return; }
    let live = true;
    setState({ phase: "loading" });
    verifyLink(hash.slice(1)).then(result => live && setState({ phase: "done", result }));
    return () => { live = false; };
  }, [hash]);

  const submit = useCallback(raw => {
    const value = raw.trim();
    if (!value) return;
    const marker = value.indexOf("#");
    setScanning(false);
    navigate({ pathname: "/verify", hash: `#${marker >= 0 ? value.slice(marker + 1) : value}` });
  }, [navigate]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Document services / Verification</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight">Verify a MUT document</h1>
        <p className="mt-2 text-muted">Scan the QR code printed on the document or paste its secure verification link.</p>
      </div>

      {state.phase === "loading" && <div role="status" className="animate-pulse rounded-2xl border border-line bg-white p-10 text-center text-muted">Checking the blockchain...</div>}
      {state.phase === "done" && <ResultCard result={state.result} />}

      <section className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f2ed] text-ink"><svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v6h5M9 14h6M9 17h6"/></svg></span>
          <div><h2 className="text-lg font-bold">{state.phase === "done" ? "Check another document" : "Enter document link"}</h2><p className="mt-0.5 text-sm text-muted">The link is checked in your browser against the registered fingerprint.</p></div>
        </div>
        <label htmlFor="link" className="mt-5 block text-xs font-bold uppercase tracking-wider text-muted">Verification link</label>
        <textarea id="link" rows={3} value={text} onChange={event => setText(event.target.value)} placeholder="https://.../verify#..." className="mt-2 w-full rounded-xl border border-line bg-[#f8faf9] p-3 font-mono text-sm" />
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={() => submit(text)} disabled={!text.trim()} className="rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white hover:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-45">Verify document</button>
          <button onClick={() => setScanning(value => !value)} className="rounded-xl border border-line px-5 py-3 text-sm font-bold hover:bg-field">{scanning ? "Close camera" : "Scan QR code"}</button>
        </div>
        <p className="mt-4 border-t border-line pt-4 text-xs leading-5 text-muted">A valid result confirms the record matches the document details. Please verify the identity of the person presenting it separately.</p>
        {scanning && <QrScanner onResult={submit} onClose={() => setScanning(false)} />}
      </section>
    </div>
  );
}
