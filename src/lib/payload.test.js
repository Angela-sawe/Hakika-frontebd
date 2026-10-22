import { describe, expect, it } from "vitest";
import { canonical, computeFingerprint } from "./fingerprint.js";
import { decodePayload, encodePayload } from "./payload.js";

const vector = {
  docId: "11111111-2222-3333-4444-555555555555",
  docType: "CLEARANCE",
  regNo: "DEMO/0001/2021",
  name: "Jane Wanjiru",
  program: "BSc Medical Laboratory Sciences",
  issuedOn: "2026-10-21",
  salt: "abc123"
};

describe("MUTV1 certificate payload", () => {
  it("matches the published payload and fingerprint vector", () => {
    const payload = "eyJ2IjoxLCJkIjoiMTExMTExMTEtMjIyMi0zMzMzLTQ0NDQtNTU1NTU1NTU1NTU1IiwidCI6IkNMRUFSQU5DRSIsInIiOiJERU1PLzAwMDEvMjAyMSIsIm4iOiJKYW5lIFdhbmppcnUiLCJwIjoiQlNjIE1lZGljYWwgTGFib3JhdG9yeSBTY2llbmNlcyIsImkiOiIyMDI2LTEwLTIxIiwicyI6ImFiYzEyMyJ9";
    expect(canonical(vector)).toBe("MUTV1|11111111-2222-3333-4444-555555555555|CLEARANCE|DEMO/0001/2021|Jane Wanjiru|BSc Medical Laboratory Sciences|2026-10-21|abc123");
    expect(encodePayload(vector)).toBe(payload);
    expect(decodePayload(payload)).toEqual(vector);
    expect(computeFingerprint(vector)).toBe("0xd42832f2146b13861b7487df30942741d0bf618644dd81c661556a8eeb44564e");
  });

  it("rejects unsupported versions and invalid fingerprint fields", () => {
    expect(decodePayload(btoa(JSON.stringify({ v: 2 })))).toBeNull();
    expect(() => computeFingerprint({ ...vector, name: "Jane|Wanjiru" })).toThrow();
    expect(() => computeFingerprint({ ...vector, name: "  " })).toThrow();
  });
});
