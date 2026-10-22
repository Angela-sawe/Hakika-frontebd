import { useState } from "react";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { buildLink } from "../lib/payload.js";
import { SAMPLES, TAMPERED } from "../lib/samples.js";

const CASES = [
  { key: "genuine", title: "Genuine certificate", expect: "Shows green: Genuine", payload: SAMPLES.genuine },
  { key: "revoked", title: "Revoked transcript", expect: "Shows red: Revoked", payload: SAMPLES.revoked },
  { key: "tampered", title: "Tampered certificate", expect: "Shows amber: Not verified (one letter was removed from the programme name)", payload: TAMPERED }
];

function Case({ c }) {
  const link = buildLink(c.payload).replace("/verify#", "/verify?mock=1&demo=1#");
  const [copied, setCopied] = useState(false);
  return (
    <li className="rounded-xl border border-line bg-white p-5">
      <h3 className="font-bold">{c.title}</h3>
      <p className="text-sm text-muted">{c.payload.name} · {c.payload.program}</p>
      <div className="my-3 inline-block rounded-lg border border-line bg-white p-2"><QRCodeSVG value={link} size={140} /></div>
      <p className="text-sm">{c.expect}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link to={{ pathname: "/verify", search: "?mock=1&demo=1", hash: "#" + link.split("#")[1] }} className="min-h-11 content-center rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-2">Open</Link>
        <button onClick={async () => { try { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* blocked */ } }}
          className="rounded-lg border border-line px-4 py-2 text-sm font-semibold hover:bg-field">{copied ? "Copied" : "Copy link"}</button>
      </div>
    </li>
  );
}

export default function Demo() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Demo documents</h1>
        <p className="text-muted">Fictional sample records for presentations. Sample links explicitly enable mock mode; ordinary verification always checks the chain.</p>
      </div>
      <ul className="grid gap-4 md:grid-cols-3">{CASES.map(c => <Case key={c.key} c={c} />)}</ul>
      <p className="text-sm text-muted">Scanning from a phone: run <code>npm run dev</code>, then open the "Network" address it prints on both devices (same Wi-Fi) so the QR code points at your laptop, not at "localhost".</p>
    </div>
  );
}
