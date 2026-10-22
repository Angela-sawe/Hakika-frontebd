import { keccak256, toUtf8Bytes } from "ethers";

export const FIELD_ORDER = ["docId", "docType", "regNo", "name", "program", "issuedOn", "salt"];

export function canonical(payload) {
  const values = FIELD_ORDER.map(key => String(payload?.[key] ?? "").trim().normalize("NFC"));
  if (values.some(value => !value || value.includes("|"))) {
    throw new Error("Invalid document fields");
  }
  return `MUTV1|${values.join("|")}`;
}

export function computeFingerprint(payload) {
  return keccak256(toUtf8Bytes(canonical(payload)));
}
