import { useEffect, useState } from "react";

// Camera scanner. The library loads only when this component opens.
export default function QrScanner({ onResult, onClose }) {
  const [error, setError] = useState("");

  useEffect(() => {
    let scanner, cancelled = false;
    (async () => {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        if (cancelled) return;
        scanner = new Html5Qrcode("qr-reader");
        await scanner.start({ facingMode: "environment" }, { fps: 10, qrbox: 240 }, text => {
          if (cancelled) return;
          cancelled = true;
          scanner.stop().catch(() => {}).finally(() => onResult(text));
        });
      } catch {
        setError("The camera is not available. Allow camera access, or paste the link instead.");
      }
    })();
    return () => {
      cancelled = true;
      if (scanner?.isScanning) scanner.stop().then(() => scanner.clear()).catch(() => {});
    };
  }, [onResult]);

  return (
    <div className="mt-4 rounded-lg border border-line p-3">
      <div id="qr-reader" className="mx-auto w-full max-w-sm overflow-hidden rounded-md" />
      {error && <p className="mt-2 text-sm text-warn">{error}</p>}
      <button onClick={onClose} className="mt-3 text-sm font-semibold underline">Close camera</button>
    </div>
  );
}
