import { useState } from "react";
import { verifyLink } from "../lib/verify.js";
import { docLabel, toCsv } from "../lib/format.js";

const LABEL = { genuine: "Genuine", revoked: "Revoked", not_verified: "Not verified", invalid: "Invalid link", error: "Error" };
const COLOR = { genuine: "text-ok", revoked: "text-bad", not_verified: "text-warn", invalid: "text-warn", error: "text-warn" };

export default function Batch() {
  const [text, setText] = useState("");
  const [rows, setRows] = useState(null);
  const [busy, setBusy] = useState(false);

  async function run() {
    const links = [...new Set(text.split(/\s+/).map(s => s.trim()).filter(s => s.includes("#") || s.length > 40))];
    if (!links.length) { setRows([]); return; }
    setBusy(true);
    const results = await Promise.all(links.map(verifyLink));
    setRows(results);
    setBusy(false);
  }

  function download() {
    const csv = toCsv([["Status", "Name", "Registration no.", "Document", "Issued"],
      ...rows.map(r => [LABEL[r.status], r.payload?.name ?? "", r.payload?.regNo ?? "", r.payload ? docLabel(r.payload.docType) : "", r.payload?.issued ?? ""])]);
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })), download: "hakiki-results.csv" });
    a.click();
  }

  const count = s => rows.filter(r => r.status === s).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Check many documents</h1>
        <p className="text-muted">For employers and admissions offices. Paste one verification link per line.</p>
      </div>

      <section className="rounded-xl border border-line bg-white p-5">
        <label htmlFor="links" className="text-sm font-semibold">Verification links</label>
        <textarea id="links" rows={6} value={text} onChange={e => setText(e.target.value)} placeholder={"https://…/verify#…\nhttps://…/verify#…"}
          className="mt-1 w-full rounded-lg border border-line p-3 font-mono text-sm" />
        <button onClick={run} disabled={busy} className="mt-3 rounded-lg bg-ink px-5 py-2.5 font-semibold text-white hover:bg-ink-2 disabled:opacity-60">{busy ? "Checking…" : "Verify all"}</button>
      </section>

      {rows && (
        rows.length === 0
          ? <p className="rounded-xl border border-line bg-white p-5">No verification links found. Each link contains <code>/verify#</code>.</p>
          : (
            <section className="rounded-xl border border-line bg-white p-5">
              <h2 className="text-lg font-bold">{rows.length} checked: {count("genuine")} genuine, {count("revoked")} revoked, {rows.length - count("genuine") - count("revoked")} not verified</h2>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-muted"><tr>{["Status", "Name", "Reg. no.", "Document", "Issued"].map(h => <th key={h} className="border-b border-line py-2 pr-3 font-semibold">{h}</th>)}</tr></thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i} className="border-b border-line last:border-0">
                        <td className={`py-2 pr-3 font-semibold ${COLOR[r.status]}`}>{LABEL[r.status]}</td>
                        <td className="py-2 pr-3">{r.payload?.name ?? "—"}</td>
                        <td className="py-2 pr-3">{r.payload?.regNo ?? "—"}</td>
                        <td className="py-2 pr-3">{r.payload ? docLabel(r.payload.docType) : "—"}</td>
                        <td className="py-2 pr-3">{r.payload?.issued ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button onClick={download} className="mt-4 rounded-lg border border-line px-4 py-2 font-semibold hover:bg-field">Download results (CSV)</button>
            </section>
          )
      )}
    </div>
  );
}
