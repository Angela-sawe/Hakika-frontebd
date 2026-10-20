// The one function the UI calls. Turns a link into a result object:
//   { status: "genuine" | "revoked" | "not_verified" | "invalid" | "error", payload?, hash?, record? }
import { computeFingerprint } from "./fingerprint.js";
import { parseLink } from "./payload.js";
import { lookup } from "./registry/index.js";

export async function verifyLink(input) {
  const payload = parseLink(input);
  if (!payload) return { status: "invalid" };
  try {
    const hash = await computeFingerprint(payload);   // recomputed here, in the browser
    const record = await lookup(hash);                // then compared with what is on-chain
    if (!record) return { status: "not_verified", payload, hash };
    return { status: record.revoked ? "revoked" : "genuine", payload, hash, record };
  } catch (error) {
    console.error(error);
    return { status: "error", payload, error };
  }
}
