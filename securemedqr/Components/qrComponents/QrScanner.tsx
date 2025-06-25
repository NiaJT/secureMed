"use client";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

export default function QRScanner() {
  const qrRegionId = "qr-reader";
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const runScanner = async () => {
      try {
        setLoading(true);

        const cameras = await Html5Qrcode.getCameras();
        if (!cameras.length) throw new Error("No cameras found");

        // Prevent re-init if already scanning
        if (html5QrCodeRef.current) return;

        const qrCodeScanner = new Html5Qrcode(qrRegionId);
        html5QrCodeRef.current = qrCodeScanner;

        await qrCodeScanner.start(
          cameras[0].id,
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            if (!scanResult) {
              setScanResult(decodedText);
              qrCodeScanner
                .stop()
                .then(() => qrCodeScanner.clear())
                .catch(() => {});
              html5QrCodeRef.current = null;
              setLoading(false);
            }
          }
        );
      } catch (err) {
        console.error("Scanner start error:", err);
        setErrorMsg("Camera error: " + String(err));
        setLoading(false);
      }
    };

    if (!scanResult) {
      runScanner();
    }

    return () => {
      html5QrCodeRef.current?.stop().catch(() => {});
      html5QrCodeRef.current?.clear().catch(() => {});
      html5QrCodeRef.current = null;
    };
  }, [scanResult]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode(qrRegionId);
    }

    try {
      const result = await html5QrCodeRef.current.scanFile(file, true);
      setScanResult(result);
      setErrorMsg(null);
    } catch (err) {
      console.error("File scan error:", err);
      setErrorMsg("Could not read QR from file: " + String(err));
    }
  };

  const handleRescan = () => {
    setScanResult(null);
    setErrorMsg(null);
    html5QrCodeRef.current = null; // clear reference to ensure re-initialization
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 font-sans">
      <h2 className="text-2xl font-bold text-center">QR Code Scanner</h2>

      <div
        id={qrRegionId}
        style={{
          width: "100%",
          maxWidth: "320px",
          aspectRatio: "1 / 1",
          margin: "auto",
          border: "2px solid #333",
          borderRadius: "8px",
        }}
      />

      {loading && (
        <p className="text-blue-600 text-center">Starting camera...</p>
      )}

      {scanResult && (
        <div className="bg-green-100 p-3 rounded">
          <strong>Scanned Result:</strong>
          <p>{scanResult}</p>
        </div>
      )}

      {errorMsg && <div className="text-red-600 font-semibold">{errorMsg}</div>}

      {scanResult && (
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleRescan}
        >
          Scan Again
        </button>
      )}

      <div className="mt-4">
        <label className="block font-medium mb-1" htmlFor="qr-upload">
          Upload QR Code Image
        </label>
        <input
          id="qr-upload"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
}
