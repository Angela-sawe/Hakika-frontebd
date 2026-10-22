export const SAMPLES = {
  genuine: {
    docId: "demo-genuine-0001", docType: "CLEARANCE", regNo: "DEMO/0001/2021",
    name: "Jane Wanjiru", program: "BSc Medical Laboratory Sciences", issuedOn: "2026-10-12", salt: "a41f9c0e7b2d"
  },
  revoked: {
    docId: "demo-revoked-0002", docType: "TRANSCRIPT", regNo: "DEMO/0002/2020",
    name: "Brian Otieno", program: "BSc Information Technology", issuedOn: "2026-09-30", salt: "7d02e5b1c9aa"
  }
};
export const TAMPERED = { ...SAMPLES.genuine, program: "BSc Medical Laboratory Science" };
