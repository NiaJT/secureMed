"use client";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

export default function QRScanner() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 🟩 Setup live camera scanner on mount
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      verbose: true,
    });

    // Delay render by a tick
    const id = setTimeout(() => {
      scanner.render(
        (decodedText) => alert("✅ Scanned: " + decodedText),
        (error) => console.warn("Scan error:", error)
      );
    }, 100);

    return () => {
      clearTimeout(id);
      scanner.clear().catch(() => {});
    };
  }, []);

  // 🟦 Handle uploaded image file for QR decode
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("qr-reader"); // reuse same container
    try {
      const result = await html5QrCode.scanFile(file, true); // ✅ verbose also works here
      alert("📄 File Scan: " + result);
    } catch (err) {
      alert("❌ Could not read QR from file.");
      console.error("File scan error:", err);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Scan QR Code</h2>

      {/* 🔴 Live scanner video */}
      <div id="qr-reader" style={{ width: "300px", height: "300px" }} />

      {/* 🔵 File upload section */}
      <div className="pt-4">
        <label className="block mb-2 font-medium">
          📁 Or upload a QR image
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="border rounded p-2"
        />
      </div>
    </div>
  );
}
