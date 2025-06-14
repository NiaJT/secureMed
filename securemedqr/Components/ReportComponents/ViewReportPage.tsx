"use client";

import React, { useState, useEffect } from "react";
import { Patient } from "@/interface/patientdata.interface";
import {
  FileText,
  ArrowLeft,
  User,
  Phone,
  HeartPulse,
  AlertTriangle,
  View,
} from "lucide-react";
import { format } from "date-fns";
import { axiosInstance } from "@/lib/axios.instance";
import toast from "react-hot-toast";
import Link from "next/link";

const ViewReportPage = () => {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        console.log(accessToken);
        setIsLoading(true);
        const response = await axiosInstance.get("/patient-data/detail", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            "If-Modified-Since": "0",
          },
        });

        setPatientData(response.data.patientDetails);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setError("Failed to load patient data. Please try again.");
        toast.error("Failed to load patient data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Safe array accessor for potentially undefined/null values
  const safeArray = (arr: any[] | null | undefined) => {
    return Array.isArray(arr) ? arr : [];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">Loading patient data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-red-500 text-lg text-center mb-4">{error}</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to dashboard
        </Link>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <User className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 text-lg text-center mb-4">
          No patient data found
        </p>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to dashboard
        </Link>
      </div>
    );
  }

  // Safely get arrays for allergies and chronic diseases
  const allergies = safeArray(patientData.allergies);
  const chronicDiseases = safeArray(patientData.chronicDiseases);
  const reports = safeArray(patientData.reports);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to dashboard
          </Link>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Patient Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">{patientData.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {patientData.gender[0].toUpperCase() +
                      patientData.gender.slice(1) || "Not specified"}
                  </div>
                  <span className="mx-2">•</span>
                  <div>{patientData.age || "Unknown"} years</div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <div>
                    <div className="text-sm">Emergency Contact</div>
                    <div className="font-semibold">
                      {patientData.emergencyContact?.name || "Not provided"}
                    </div>
                    <div>
                      {patientData.emergencyContact?.phone || "Not provided"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Summary */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <HeartPulse className="h-6 w-6 mr-2 text-red-500" />
              Medical Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Allergies</h3>
                <div className="flex flex-wrap gap-2">
                  {allergies.length > 0 ? (
                    allergies.map((allergy, index) => (
                      <span
                        key={index}
                        className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        {allergy}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No allergies recorded</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  Chronic Conditions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {chronicDiseases.length > 0 ? (
                    chronicDiseases.map((disease, index) => (
                      <span
                        key={index}
                        className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
                      >
                        {disease}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No chronic conditions recorded
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Medical Reports */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-500" />
              Medical Reports
            </h2>

            {reports.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-gray-500">
                  No reports available for this patient
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {reports.map((report, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {report.reportTitle || `Report #${index + 1}`}
                        </h3>
                        {report.reportDescription && (
                          <p className="text-gray-600 mt-1">
                            {report.reportDescription}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            report.verificationStatus || "pending"
                          )}`}
                        >
                          {(report.verificationStatus || "pending")
                            .charAt(0)
                            .toUpperCase() +
                            (report.verificationStatus || "pending").slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          Uploaded
                        </div>
                        <div className="font-medium">
                          {report.uploadedAt
                            ? format(
                                new Date(report.uploadedAt),
                                "MMM dd, yyyy 'at' h:mm a"
                              )
                            : "Unknown date"}
                        </div>
                      </div>

                      {report.verifiedAt && (
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            Verified
                          </div>
                          <div className="font-medium">
                            {format(
                              new Date(report.verifiedAt),
                              "MMM dd, yyyy 'at' h:mm a"
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {report.reportFileUrl && (
                      <div className="mt-5 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-gray-100 p-2 rounded-lg">
                              <FileText className="h-6 w-6 text-gray-500" />
                            </div>
                            <div className="ml-3">
                              <div className="font-medium text-gray-800">
                                Medical Report
                              </div>
                              <div className="text-sm text-gray-500">
                                {report.reportTitle}
                              </div>
                            </div>
                          </div>

                          <a
                            href={report.reportFileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                          >
                            <View className="h-4 w-4 mr-1" />
                            View{" "}
                          </a>
                        </div>
                      </div>
                    )}

                    {report.verificationRemarks && (
                      <div className="mt-5 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-2">
                          Verification Remarks
                        </h4>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-gray-700">
                            {report.verificationRemarks}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Patient record last updated:{" "}
          {reports.length > 0 && reports[reports.length - 1].uploadedAt
            ? format(
                new Date(reports[reports.length - 1].uploadedAt),
                "MMM dd, yyyy"
              )
            : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default ViewReportPage;
