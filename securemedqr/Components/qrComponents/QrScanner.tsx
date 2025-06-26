"use client";
import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function QRScanner() {
  const router=useRouter();
  const qrRegionId = "qr-reader";
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    if (scanResult) {
      router.replace(`/medical-data/scan-qr-result/${scanResult}`);
      toast.success("Qr Scanned Successfully");
    }
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
            }
          },
          (errorMessage) => {
            console.warn("QR scan error:", errorMessage);
          }
        );

        // Camera started successfully
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

    if (!scanResult) {
      runScanner();
    }

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
      if (!html5QrCodeRef.current) {
        html5QrCodeRef.current = new Html5Qrcode(qrRegionId);
      }

      const result = await html5QrCodeRef.current.scanFile(file, true);
      setScanResult(result);
      setErrorMsg(null);
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

      {/* Scanner Area */}
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
                <CameraIcon />
              </div>
              <p>Camera inactive</p>
              <p className="text-sm mt-1">
                Click &quot;Scan Again&quot; to restart
              </p>
            </div>
          )}
        </div>

        {/* Loading Indicator - Only shown when camera is starting */}
        {loading && (
          <div className="mt-4 flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-blue-600 font-medium">Loading scanner...</p>
          </div>
        )}
      </div>

      {/* Scan Result */}
      {scanResult && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 animate-fadeIn">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircleIcon />
            </div>
            <div className="ml-3">
              <h3 className="text-green-800 font-medium">
                Scanned Successfully!
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 animate-fadeIn">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ErrorIcon />
            </div>
            <div className="ml-3">
              <h3 className="text-red-800 font-medium">Scan Error</h3>
              <p className="text-red-700 mt-1 text-sm">{errorMsg}</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        {scanResult ? (
          <button
            onClick={handleRescan}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <RefreshIcon />
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
              <UploadIcon />
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

// Icons for UI
const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-red-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const RefreshIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);
