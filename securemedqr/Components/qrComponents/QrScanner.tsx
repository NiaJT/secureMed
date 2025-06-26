"use client";
import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  Camera,
  CheckCircle,
  UploadCloud,
  RefreshCcw,
  AlertTriangle,
} from "lucide-react";

export default function QRScanner() {
  const router = useRouter();
  const qrRegionId = "qr-reader";
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const runScanner = async () => {
      try {
        setLoading(true);
        setCameraActive(true);

        const cameras = await Html5Qrcode.getCameras();
        if (!cameras.length) throw new Error("No cameras found");

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
                .then(() => {
                  qrCodeScanner.clear();
                  setCameraActive(false);
                })
                .catch(() => {});
              html5QrCodeRef.current = null;
              toast.success("QR Scanned Successfully");
              router.replace(`/medical-data/scan-qr-result/${decodedText}`);
            }
          },
          (errorMessage) => {
            console.warn("QR scan error:", errorMessage);
          }
        );

        if (isMounted) setLoading(false);
      } catch (err) {
        console.error("Scanner start error:", err);
        if (isMounted) {
          setErrorMsg("Camera error: " + String(err));
          setLoading(false);
          setCameraActive(false);
        }
      }
    };

    if (!scanResult) runScanner();

    return () => {
      isMounted = false;
      if (html5QrCodeRef.current?.isScanning) {
        html5QrCodeRef.current.stop().catch(() => {});
        html5QrCodeRef.current.clear();
        html5QrCodeRef.current = null;
        setCameraActive(false);
      }
    };
  }, [scanResult]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);

      if (html5QrCodeRef.current?.isScanning) {
        await html5QrCodeRef.current.stop();
        await html5QrCodeRef.current.clear();
        html5QrCodeRef.current = null;
        setCameraActive(false);
      }

      const qrCodeScanner = new Html5Qrcode(qrRegionId);
      html5QrCodeRef.current = qrCodeScanner;

      const result = await qrCodeScanner.scanFile(file, true);
      setScanResult(result);
      setErrorMsg(null);

      await qrCodeScanner.clear();
      html5QrCodeRef.current = null;
    } catch (err) {
      console.error("File scan error:", err);
      setErrorMsg("Could not read QR from file: " + String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleRescan = () => {
    setScanResult(null);
    setErrorMsg(null);
    html5QrCodeRef.current = null;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">QR Code Scanner</h1>
        <p className="text-gray-600 mt-2">Scan a QR code or upload an image</p>
      </div>

      <div className="mb-6">
        <div
          id={qrRegionId}
          className={`
            w-full mx-auto rounded-xl overflow-hidden border-4
            ${cameraActive ? "border-blue-500" : "border-gray-300"}
            transition-all duration-300 aspect-square
            ${!cameraActive && "bg-gray-100 flex items-center justify-center"}
          `}
        >
          {!cameraActive && (
            <div className="text-center p-4 text-gray-500">
              <div className="mx-auto bg-gray-200 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-3">
                <Camera className="w-6 h-6" />
              </div>
              <p>Camera inactive</p>
              <p className="text-sm mt-1">Click &quot;Scan Again&quot; to restart</p>
            </div>
          )}
        </div>

        {loading && (
          <div className="mt-4 flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-blue-600 font-medium">Loading scanner...</p>
          </div>
        )}
      </div>

      {scanResult && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 animate-fadeIn">
          <div className="flex items-start">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div className="ml-3">
              <h3 className="text-green-800 font-medium">
                Scanned Successfully!
              </h3>
            </div>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 animate-fadeIn">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div className="ml-3">
              <h3 className="text-red-800 font-medium">Scan Error</h3>
              <p className="text-red-700 mt-1 text-sm">{errorMsg}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {scanResult ? (
          <button
            onClick={handleRescan}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            Scan Again
          </button>
        ) : (
          <div className="relative">
            <input
              id="qr-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={loading}
            />
            <div className="py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2">
              <UploadCloud className="w-5 h-5" />
              Upload QR Image
            </div>
          </div>
        )}

        <a
          href={scanResult || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`py-3 px-4 text-center font-medium rounded-lg transition duration-200 ${
            scanResult
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          onClick={!scanResult ? (e) => e.preventDefault() : undefined}
        >
          Open Link
        </a>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Position the QR code within the frame to scan</p>
      </div>
    </div>
  );
}
