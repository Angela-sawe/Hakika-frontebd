// Demo adapter: knows the two sample records, so the whole app works with no blockchain.
import { SAMPLES } from "../samples.js";
import { computeFingerprint } from "../fingerprint.js";

let tablePromise;
const table = () => (tablePromise ??= (async () => {
  const m = new Map();
  for (const [key, revoked] of [["genuine", false], ["revoked", true]]) {
    m.set(await computeFingerprint(SAMPLES[key]), { revoked, issuedAt: Date.parse(SAMPLES[key].issued) / 1000 });
  }
  return m;
})());

export async function lookup(hash) {
  const m = await table();
  await new Promise(r => setTimeout(r, 450)); // feel like a network call
  return m.get(hash) ?? null;
}
