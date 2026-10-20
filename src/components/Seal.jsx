const KINDS = {
  ok: { c: "#1B7F4B", bg: "#E3F3EA", path: "M34 58l15 15 30-34", dash: undefined },
  bad: { c: "#B3261E", bg: "#FBE7E5", path: "M40 40l32 32M72 40L40 72", dash: "22 8" },
  warn: { c: "#9A6200", bg: "#FBF0DB", path: null, dash: undefined }
};

export default function Seal({ kind = "ok", className = "" }) {
  const k = KINDS[kind];
  return (
    <svg viewBox="0 0 112 112" aria-hidden="true" className={`animate-stamp motion-reduce:animate-none ${className}`}>
      <circle cx="56" cy="56" r="52" fill="none" stroke={k.c} strokeWidth="4" strokeDasharray={k.dash} />
      <circle cx="56" cy="56" r="44" fill={k.bg} stroke={k.c} strokeWidth="1.5" />
      {k.path ? (
        <path d={k.path} fill="none" stroke={k.c} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <>
          <path d="M45 44a11 11 0 1 1 15 10c-3 2-4 4-4 8" fill="none" stroke={k.c} strokeWidth="7" strokeLinecap="round" />
          <circle cx="56" cy="76" r="4.5" fill={k.c} />
        </>
      )}
    </svg>
  );
}
