import { computeFingerprint } from "./fingerprint.js";
import { parseLink } from "./payload.js";
import { lookup } from "./registry/index.js";

export async function verifyLink(input, options) {
  const payload = parseLink(input);
  if (!payload) return { status: "invalid" };
  let hash;
  try {
    hash = computeFingerprint(payload);
  } catch {
    return { status: "invalid", payload };
  }
  try {
    const record = await lookup(hash, options);
    if (!record.exists) return { status: "not_verified", payload, hash };
    return { status: record.revoked ? "revoked" : "genuine", payload, hash, record };
  } catch {
    return { status: "error", payload, hash };
  }
}
