/* ===================================================================
 * MUST MATCH the anchor-service fingerprint code exactly.
 * If one byte differs, every real certificate will show "Not verified".
 *
 * ASSUMED here (confirm against anchor-service, then edit this one file):
 *   - fields in this fixed order: docType, regNo, name, program, issued, salt
 *   - each value trimmed, joined with the "unit separator" character (U+001F)
 *   - SHA-256 of the UTF-8 bytes, shown as 0x + 64 hex characters
 * If the service uses keccak256 (ethers), replace the hashing lines with:
 *   import { keccak256, toUtf8Bytes } from "ethers";
 *   return keccak256(toUtf8Bytes(canonical(p)));
 * =================================================================== */
export const FIELD_ORDER = ["docType", "regNo", "name", "program", "issued", "salt"];

export const canonical = p =>
  FIELD_ORDER.map(k => String(p[k] ?? "").normalize("NFC").trim()).join("\u001f");

export async function computeFingerprint(p) {
  const bytes = new TextEncoder().encode(canonical(p));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return "0x" + [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("");
}
