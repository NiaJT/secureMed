"use client";
import React, { useEffect, useState } from "react";
import {
   Download,
  Share2,
  Printer,
  FileText,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import QRCode from "qrcode";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios.instance";
import toast from "react-hot-toast";
import { getTokenExpiry } from "@/utils/decodeQr";

interface IQrData {
  qrToken: string;
  _id: string;
  user: string;
  verifiedAt: string;
}

interface IResponse {
  message: string;
  qrData: IQrData;
}

const QrPage = () => {
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [patientName, setPatientName] = useState<string>("");
  const [patientDob, setPatientDob] = useState<string>("");

  const { data, isLoading, isError, error } = useQuery<IResponse>({
    queryKey: ["patientQr"],
    queryFn: async () => {
      const response = await axiosInstance.get("/patient-data/getQr");
      return response.data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch QR data");
      console.error("QR fetch error:", error);
    }
  }, [isError, error]);

  useEffect(() => {
    const handleQr = async () => {
      if (data?.qrData?.qrToken) {
        try {
          // Generate QR code image
          const imgUrl = await QRCode.toDataURL(data.qrData.qrToken);
          setQrImage(imgUrl);

          // Decode expiry
          const expiryDate = getTokenExpiry(data.qrData.qrToken);
          if (expiryDate) {
            setExpiresAt(expiryDate);
          }

          // Fetch patient details (simulated)
          setPatientName("Sarah Johnson");
          setPatientDob("1985-03-15");
        } catch (err) {
          console.error("QR generation error:", err);
          toast.error("Failed to generate QR code");
        }
      } else if (data?.message === "Your Request has not been verified yet") {
        // Handle 404 case specifically
        toast.error("QR not available: Patient not verified");
      }
    };

    handleQr();
  }, [data]);

  const handleDownloadQr = () => {
    if (!qrImage) return;

    const link = document.createElement("a");
    link.href = qrImage;
    link.download = `medical-report-qr-${data?.qrData?._id || Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (!qrImage || !data?.qrData?.qrToken) return;

    try {
      if (navigator.share) {
        const blob = await fetch(qrImage).then((res) => res.blob());
        const file = new File([blob], "medical-qr.png", { type: "image/png" });

        await navigator.share({
          title: "My Medical Report QR Code",
          text: "Scan this QR code to access my medical report",
          files: [file],
        });
      } else {
        await navigator.clipboard.writeText(data.qrData.qrToken);
        toast.success("QR token copied to clipboard!");
      }
    } catch (err) {
      console.error("Sharing failed:", err);
      toast.error("Sharing failed. Please try another method.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">
            Secure Medical Report Access
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your medical records securely with healthcare providers using
            this QR code
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none">
          {/* Header */}
          <div className="bg-blue-700 text-white px-6 py-4 print:bg-blue-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="text-xl font-bold">{patientName}</h2>
                <p className="text-blue-100 text-sm">
                  Patient ID: {data?.qrData?.user || "N/A"} | DOB: {patientDob}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-200">
                  Report ID: {data?.qrData?._id || "N/A"}
                </p>
                <p className="text-xs text-blue-200">
                  Verified:{" "}
                  {data?.qrData?.verifiedAt
                    ? new Date(data.qrData.verifiedAt).toLocaleDateString()
                    : "Not verified"}
                </p>
              </div>
            </div>
          </div>

          {/* QR + Info */}
          <div className="p-6 flex flex-col md:flex-row gap-8">
            {/* QR Code Section */}
            <div className="md:w-1/2 flex flex-col items-center">
              <div className="bg-white border-4 border-blue-200 rounded-xl p-6 shadow-md mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="bg-white p-4 rounded-md flex justify-center">
                    {qrImage ? (
                      <Image
                        src={qrImage}
                        alt="Patient Medical Report QR Code"
                        className="w-44 h-44"
                        width={176}
                        height={176}
                      />
                    ) : data?.message ===
                      "Your Request has not been verified yet" ? (
                      <div className="flex flex-col items-center justify-center w-44 h-44">
                        <Image
                          src="/fallback_noqr.webp"
                          alt="QR not available"
                          width={120}
                          height={120}
                          className="w-32 h-32 object-contain"
                        />
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          Patient not verified
                        </p>
                      </div>
                    ) : (
                      <div className="w-44 h-44 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4 text-center">
                {data?.message === "Your Request has not been verified yet"
                  ? "QR code not available - patient verification required"
                  : "Scan this QR code to access the medical report"}
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleDownloadQr}
                  disabled={!qrImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  Download QR
                </button>
                <button
                  onClick={handleShare}
                  disabled={!qrImage}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>

            {/* Report Info Section */}
            <div className="md:w-1/2">
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Report Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Verification Status:</span>
                    <span
                      className={`font-medium ${
                        data?.qrData?.verifiedAt
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {data?.qrData?.verifiedAt
                        ? "Verified"
                        : "Pending Verification"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Verified Date:</span>
                    <span className="font-medium">
                      {data?.qrData?.verifiedAt
                        ? new Date(data.qrData.verifiedAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">QR Code Expiry:</span>
                    <span className="font-medium">
                      {expiresAt || "Loading..."}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Token ID:</span>
                    <span className="font-medium text-xs break-all text-right max-w-[60%]">
                      {data?.qrData?.qrToken?.substring(0, 20) + "..." || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Security Notice
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        This QR code provides access to sensitive medical
                        information. Only share with authorized healthcare
                        providers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {isError && (
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Error loading QR data
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>
                          Failed to fetch your medical QR code. Please try again
                          later.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t print:hidden">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">
                {expiresAt
                  ? `This QR code expires on ${expiresAt}`
                  : "Loading expiration date..."}
              </p>
              <div className="flex gap-4 mt-2 md:mt-0">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Report an Issue
                </button>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Generate New QR
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Instructions - Hidden when QR not available */}
        {data?.qrData?.qrToken && (
          <div className="mt-8 text-center print:mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              How to use this QR code
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                {
                  step: 1,
                  title: "Show to your doctor",
                  description: "Present this QR code at your appointment",
                },
                {
                  step: 2,
                  title: "Scan with smartphone",
                  description: "Use your device's camera to scan the code",
                },
                {
                  step: 3,
                  title: "Access securely",
                  description: "View your medical report on any device",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm print:shadow-none print:border-none"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mb-3 mx-auto">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrPage;
