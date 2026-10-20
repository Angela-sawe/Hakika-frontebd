import { Link } from "react-router-dom";

const FAQS = [
  { question: "What can I verify with Hakiki?", answer: "The current document flow is built around MUT degree certificates, academic transcripts and clearance forms. The QR link carries the details needed to check its fingerprint." },
  { question: "What does a Genuine result mean?", answer: "It means the details in the verification link produce the same fingerprint as a registered record. It does not confirm the identity of the person presenting the document, so check their ID separately." },
  { question: "What should I do if a document is Revoked or Not verified?", answer: "A Revoked result means the record was registered and later withdrawn. Not verified means the supplied details do not match a registered record. Contact the issuing university office to resolve a discrepancy before relying on the document." },
  { question: "Does Hakiki store personal details on the blockchain?", answer: "No personal details are written to the blockchain. The verification details are carried in the link fragment and the browser checks their fingerprint against the registry." },
  { question: "Can I check several documents at once?", answer: "Yes. Open Bulk verification, paste one verification link per line, select Verify all, then download the results as a CSV file." },
  { question: "Does this site issue or download certificates?", answer: "No. Hakiki is a verification prototype. It checks existing verification links; it does not issue certificates, create accounts or provide certificate downloads." },
  { question: "Are the sample documents real?", answer: "No. The Demo page uses fictional sample data to demonstrate the checking flow. Do not use sample results to make decisions about a real person." }
];

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24 grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
      <div><p className="text-xs font-bold uppercase tracking-[0.17em] text-emerald-800">Need a hand?</p><h2 id="faq-title" className="mt-2 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Questions, answered.</h2><p className="mt-3 max-w-sm text-sm leading-6 text-muted">A few details about the service, what results mean, and what to do next.</p><Link to="/demo" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:underline">Explore sample results <span aria-hidden="true">&rarr;</span></Link></div>
      <div className="divide-y divide-[#e5ebe7] border-y border-[#e5ebe7]">
        {FAQS.map((item, index) => <details key={item.question} className="group py-4" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold marker:hidden"><span>{item.question}</span><span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-[#eff6f1] text-emerald-800 transition group-open:rotate-45">+</span></summary>
          <p className="max-w-3xl pr-10 pt-3 text-sm leading-6 text-muted">{item.answer}</p>
        </details>)}
      </div>
    </section>
  );
}
