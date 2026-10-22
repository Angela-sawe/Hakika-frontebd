const toB64Url = bytes => btoa(String.fromCharCode(...bytes))
  .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function fromB64Url(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return Uint8Array.from(atob(base64), character => character.charCodeAt(0));
}

export function encodePayload(payload) {
  const data = {
    v: 1, d: payload.docId, t: payload.docType, r: payload.regNo,
    n: payload.name, p: payload.program, i: payload.issuedOn, s: payload.salt
  };
  return toB64Url(new TextEncoder().encode(JSON.stringify(data)));
}

export function decodePayload(text) {
  try {
    const data = JSON.parse(new TextDecoder().decode(fromB64Url(text.trim())));
    if (data?.v !== 1) return null;
    const payload = {
      docId: data.d, docType: data.t, regNo: data.r,
      name: data.n, program: data.p, issuedOn: data.i, salt: data.s
    };
    if (Object.values(payload).some(value => typeof value !== "string")) return null;
    return payload;
  } catch {
    return null;
  }
}

export function parseLink(input) {
  const marker = input.indexOf("#");
  return decodePayload(marker >= 0 ? input.slice(marker + 1) : input);
}

export const buildLink = (payload, origin = window.location.origin) => `${origin}/verify#${encodePayload(payload)}`;
