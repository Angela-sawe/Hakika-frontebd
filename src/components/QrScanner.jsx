import { useEffect, useRef, useState } from "react";

export default function QrScanner({ onResult, onClose }) {
  const scannerRef = useRef(null);
  const [cameraError, setCameraError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => () => {
      const scanner = scannerRef.current;
      if (scanner?.isScanning) scanner.stop().then(() => scanner.clear()).catch(() => {});
  }, []);

  async function startCamera() {
    setCameraError("");
    try {
      if (!scannerRef.current) {
        const { Html5Qrcode } = await import("html5-qrcode");
        scannerRef.current = new Html5Qrcode("hakika-qr-reader");
      }
      await scannerRef.current.start({ facingMode: "environment" }, { fps: 10, qrbox: { width: 240, height: 240 } }, async value => {
        setCameraOn(false);
        try { await scannerRef.current.stop(); } catch { /* camera may already be stopped */ }
        onResult(value);
      });
      setCameraOn(true);
    } catch {
      setCameraError("Camera access was denied or no camera is available. Allow access, or upload a photo.");
    }
  }

  async function scanPhoto(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setPhotoError("");
    try {
      if (scannerRef.current?.isScanning) await scannerRef.current.stop();
      if (!scannerRef.current) {
        const { Html5Qrcode } = await import("html5-qrcode");
        scannerRef.current = new Html5Qrcode("hakika-qr-reader");
      }
      onResult(await scannerRef.current.scanFile(file, false));
    } catch {
      setPhotoError("No QR code found in that photo. Try a clearer, closer picture.");
    }
  }

  return <div className="mt-4 rounded-xl border border-line bg-[#f8faf9] p-4">
    <div id="hakika-qr-reader" className="mx-auto w-full max-w-sm overflow-hidden rounded-lg" />
    <div className="mt-3 flex flex-wrap gap-2">
      {!cameraOn && <button type="button" onClick={startCamera} className="min-h-11 rounded-xl bg-ink px-4 py-2.5 text-sm font-bold text-white hover:bg-ink-2">Scan with camera</button>}
      <label className="inline-flex min-h-11 cursor-pointer items-center rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink hover:bg-field">
        Upload a photo<input type="file" accept="image/*" onChange={scanPhoto} className="sr-only" />
      </label>
      <button type="button" onClick={onClose} className="min-h-11 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold hover:bg-field">Close scanner</button>
    </div>
    {cameraError && <p role="status" className="mt-3 text-sm text-bad">{cameraError}</p>}
    {photoError && <p role="status" className="mt-3 text-sm text-bad">{photoError}</p>}
  </div>;
}
