/* ===================================================================
 * The QR link format. MUST MATCH what anchor-service puts in the QR.
 *
 * ASSUMED: https://<site>/verify#<base64url(JSON)>
 * where the JSON holds { docType, regNo, name, program, issued, salt }.
 * The details sit after the "#", so browsers never send them to a server.
 * =================================================================== */
import { FIELD_ORDER } from "./fingerprint.js";

const toB64Url = bytes => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const fromB64Url = s => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));

export function encodePayload(obj) {
  return toB64Url(new TextEncoder().encode(JSON.stringify(obj)));
}

export function decodePayload(text) {
  try {
    const obj = JSON.parse(new TextDecoder().decode(fromB64Url(text.trim())));
    return FIELD_ORDER.every(k => typeof obj[k] === "string") ? obj : null;
  } catch {
    return null;
  }
}

/** Accepts a full link or just the part after the "#". Returns the details object or null. */
export function parseLink(input) {
  const i = input.indexOf("#");
  return decodePayload(i >= 0 ? input.slice(i + 1) : input);
}

export const buildLink = (payload, origin = window.location.origin) => `${origin}/verify#${encodePayload(payload)}`;
