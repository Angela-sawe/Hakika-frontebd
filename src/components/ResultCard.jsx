import { useState } from "react";
import Seal from "./Seal.jsx";
import { CONFIG } from "../config.js";
import { docLabel, fmtDate, shortHash } from "../lib/format.js";

const VIEW = {
  genuine: { tone: "ok", title: "Genuine", text: "MUT issued this exact record, and it is registered on the blockchain." },
  revoked: { tone: "bad", title: "Revoked", text: "MUT issued this record but has since withdrawn it. Do not accept it." },
  not_verified: { tone: "warn", title: "Not verified", text: "These details do not match any record MUT registered. The document may have been altered or forged." },
  invalid: { tone: "warn", title: "Link not recognised", text: "This does not look like a MUT verification link. Scan the QR code on the document again." },
  error: { tone: "warn", title: "Could not check", text: "We could not reach the blockchain. Check your connection and try again." }
};
const TEXT = { ok: "text-ok", bad: "text-bad", warn: "text-warn" };
const BORDER = { ok: "border-ok/40", bad: "border-bad/40", warn: "border-warn/40" };

export default function ResultCard({ result }) {
  const v = VIEW[result.status];
  const p = result.payload;
  const [copied, setCopied] = useState(false);

  const rows = p && result.status !== "error" ? [
    ["Document", docLabel(p.docType)],
    ["Name", p.name],
    ["Registration no.", p.regNo],
    ["Programme", p.program],
    ["Issued", fmtDate(p.issued)],
    result.record && ["Registered on-chain", fmtDate(result.record.issuedAt * 1000)]
  ].filter(Boolean) : [];

  async function copy() {
    try { await navigator.clipboard.writeText(result.hash); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard blocked */ }
  }

  return (
    <section aria-live="polite" className={`rounded-xl border-2 bg-white p-6 text-center shadow-sm ${BORDER[v.tone]}`}>
      <Seal kind={v.tone} className="mx-auto mb-2 size-28" />
      <h2 className={`text-3xl font-extrabold tracking-tight ${TEXT[v.tone]}`}>{v.title}</h2>
      <p className="mx-auto mt-1 max-w-prose text-muted">{v.text}</p>

      {rows.length > 0 && (
        <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-line pt-4 text-left">
          {rows.map(([k, val]) => (
            <div key={k} className="contents">
              <dt className="text-muted">{k}</dt>
              <dd className="break-words font-semibold">{val}</dd>
            </div>
          ))}
          {result.hash && (
            <div className="contents">
              <dt className="text-muted">Fingerprint</dt>
              <dd className="flex flex-wrap items-center gap-2 font-mono text-sm">
                {shortHash(result.hash)}
                <button onClick={copy} className="rounded border border-line px-2 py-0.5 font-sans text-xs font-semibold hover:bg-field">{copied ? "Copied" : "Copy"}</button>
              </dd>
            </div>
          )}
        </dl>
      )}

      {result.status === "genuine" && (
        <p className="mt-4 rounded-lg bg-field p-3 text-left text-sm text-muted">
          This confirms the document is real and unchanged. It does not prove the person showing it is the named student, so check their identity as you normally would.
        </p>
      )}
      {!CONFIG.useMock && CONFIG.contractAddress && result.hash && (
        <a className="mt-3 inline-block text-sm font-semibold underline" target="_blank" rel="noreferrer" href={`${CONFIG.explorer}/address/${CONFIG.contractAddress}`}>View the contract on the explorer</a>
      )}
    </section>
  );
}
