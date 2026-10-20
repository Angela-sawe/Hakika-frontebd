// Fake demo people. Used by the mock registry and the Demo page.
export const SAMPLES = {
  genuine: { docType: "CLEARANCE", regNo: "DEMO/0001/2021", name: "Jane Wanjiru", program: "BSc Medical Laboratory Sciences", issued: "2026-10-12", salt: "a41f9c0e7b2d" },
  revoked: { docType: "TRANSCRIPT", regNo: "DEMO/0002/2020", name: "Brian Otieno", program: "BSc Information Technology", issued: "2026-09-30", salt: "7d02e5b1c9aa" }
};
// One letter removed from the programme name: the classic tamper test.
export const TAMPERED = { ...SAMPLES.genuine, program: "BSc Medical Laboratory Science" };
