import { CONFIG } from "../config.js";
import { fmtDate } from "../lib/format.js";

const VIEW = {
  genuine: { tone: "ok", title: "GENUINE", text: "This document matches an official record issued by Murang'a University of Technology." },
  revoked: { tone: "warn", title: "REVOKED", text: "This document was issued but has since been cancelled by the issuer. Do not rely on it." },
  not_verified: { tone: "bad", title: "NOT VERIFIED", text: "No matching record was found. This document may be forged, altered, or not issued by Murang'a University of Technology." },
  invalid: { tone: "bad", title: "NOT VERIFIED", text: "No matching record was found. This document may be forged, altered, or not issued by Murang'a University of Technology." },
  error: { tone: "bad", title: "Could not check", text: "The blockchain could not be reached. Check your internet and try again." }
};
const TONE = { ok: "text-ok border-ok/40 bg-[#f0f8f3]", warn: "text-warn border-warn/40 bg-[#fff8e8]", bad: "text-bad border-bad/40 bg-[#fff4f3]" };

export default function ResultCard({ result }) {
  const view = VIEW[result.status];
  const payload = result.payload;
  const rows = payload ? [
    ["Programme", payload.program], ["Document type", payload.docType],
    ["Issued on", fmtDate(payload.issuedOn)], ["Document ID", payload.docId],
    ...(result.record?.exists ? [["Recorded on-chain", fmtDate(result.record.issuedAt * 1000)]] : []),
    ...(result.hash ? [["Fingerprint", result.hash]] : [])
  ] : [];

  return (
    <section aria-live="polite" aria-atomic="true" className={`rounded-2xl border-2 p-5 shadow-sm sm:p-7 ${TONE[view.tone]}`}>
      <p className="text-center text-xs font-bold uppercase tracking-[0.16em]">Verification result</p>
      <h2 className="mt-1 text-center text-3xl font-extrabold tracking-tight">{view.title}</h2>
      <p className="mx-auto mt-2 max-w-prose text-center text-sm text-ink">{view.text}</p>

      {payload && <div className="mt-5 rounded-xl border border-line bg-white p-4 text-center text-ink sm:p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-muted">Name on record</p>
        <p className="mt-1 break-words text-2xl font-extrabold sm:text-3xl">{payload.name}</p>
        <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted">Registration number</p>
        <p className="mt-1 break-all text-xl font-bold sm:text-2xl">{payload.regNo}</p>
      </div>}

      {result.status === "revoked" && result.record?.revokedAt > 0 && <p className="mt-3 text-center text-sm">Cancelled on {fmtDate(result.record.revokedAt * 1000)}</p>}
      {rows.length > 0 && <dl className="mt-5 grid grid-cols-[minmax(6rem,auto)_minmax(0,1fr)] gap-x-3 gap-y-2 border-t border-line/70 pt-4 text-left text-sm sm:grid-cols-[auto_1fr] sm:gap-x-5">
        {rows.map(([label, value]) => <div key={label} className="contents">
          <dt className="text-muted">{label}</dt><dd className="break-all font-medium text-ink">{value}</dd>
        </div>)}
      </dl>}

      <p className="mt-5 rounded-xl bg-white/80 p-3 text-left text-sm text-ink">Also compare the name with the holder's national ID or student ID. Only trust this page if its address is the official one printed on the certificate.</p>
      {result.hash && <a className="mt-4 inline-block min-h-11 content-center text-sm font-semibold underline underline-offset-4" target="_blank" rel="noopener noreferrer" href={`${CONFIG.explorer}/address/${CONFIG.contractAddress}`}>View the contract on Snowtrace</a>}
    </section>
  );
}
