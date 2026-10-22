import { SAMPLES } from "../samples.js";
import { computeFingerprint } from "../fingerprint.js";

let records;
const getRecords = () => (records ??= (() => {
  const table = new Map();
  table.set(computeFingerprint(SAMPLES.genuine), { exists: true, revoked: false, issuedAt: Date.parse("2026-10-12") / 1000, revokedAt: 0 });
  table.set(computeFingerprint(SAMPLES.revoked), { exists: true, revoked: true, issuedAt: Date.parse("2026-09-30") / 1000, revokedAt: Date.parse("2026-10-10") / 1000 });
  return table;
})());

export async function lookup(hash) {
  await new Promise(resolve => setTimeout(resolve, 350));
  return getRecords().get(hash) ?? { exists: false, revoked: false, issuedAt: 0, revokedAt: 0 };
}
