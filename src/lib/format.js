export const shortHash = h => (h ? h.slice(0, 10) + "…" + h.slice(-8) : "");
const LABELS = { CLEARANCE: "Clearance form", TRANSCRIPT: "Transcript", DEGREE: "Degree certificate" };
export const docLabel = t => LABELS[String(t).toUpperCase()] ?? t;
export const fmtDate = s => {
  const d = new Date(s);
  return isNaN(d) ? String(s) : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};
export const toCsv = rows => rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
