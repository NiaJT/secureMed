"use client";

import { axiosInstance } from "@/lib/axios.instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

type Report = {
  _id: string;
  reportTitle: string;
  reportDescription?: string;
  accessLevel: string;
  verificationStatus: "pending" | "verified" | "rejected";
  reportFileUrl: string;
  verifiedAt?: string;
  verificationRemarks?: string;
};

type Patient = {
  _id: string;
  user: string;
  reports: Report[];
};

type ApiResponse = {
  patientList: Patient[];
};

const VerifyReportPage: React.FC = () => {
  const [expandedPatient, setExpandedPatient] = useState<string | null>(null);
  const [remarks, setRemarks] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();

  const { isPending, data, error } = useQuery<ApiResponse>({
    queryKey: ["patient-list"],
    queryFn: async () => {
      const res = await axiosInstance.post("/patient-data/list", {
        page: 1,
        limit: 5,
      });
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({
      patientId,
      reportId,
      action,
      remarks,
    }: {
      patientId: string;
      reportId: string;
      action: "verify" | "reject";
      remarks: string;
    }) => {
      await axiosInstance.put("/patient-data/verify", {
        patientId,
        reportId,
        action,
        remarks,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-list"] });
    },
  });

  const togglePatientExpand = (patientId: string) => {
    setExpandedPatient((prev) => (prev === patientId ? null : patientId));
  };

  if (isPending) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 text-center">
        <p>Loading patient reports...</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 text-center text-red-500">
        <p>Error loading patient reports: {error.message}</p>
      </div>
    );
  }

  const patientList = data?.patientList ?? [];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        Patient Reports Verification
      </h1>

      {patientList.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No patient reports available for verification.
        </div>
      ) : (
        <div className="space-y-4">
          {patientList.map((patient) => (
            <div
              key={patient._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => togglePatientExpand(patient._id)}
              >
                <div>
                  <h2 className="font-semibold">Patient ID: {patient.user}</h2>
                  <p className="text-sm text-gray-500">
                    {patient.reports.length} report(s) -{" "}
                    {
                      patient.reports.filter(
                        (r) => r.verificationStatus === "pending"
                      ).length
                    }{" "}
                    pending
                  </p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    expandedPatient === patient._id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {expandedPatient === patient._id && (
                <div className="border-t border-gray-200 p-4 space-y-4">
                  {patient.reports.map((report) => (
                    <div key={report._id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium">{report.reportTitle}</h3>
                          {report.reportDescription && (
                            <p className="text-sm text-gray-600 mt-1">
                              {report.reportDescription}
                            </p>
                          )}
                          <div className="mt-2 flex flex-wrap gap-2 text-xs">
                            <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                              {report.accessLevel}
                            </span>
                            <span
                              className={`px-2 py-1 rounded ${
                                report.verificationStatus === "verified"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {report.verificationStatus}
                            </span>
                            <a
                              href={report.reportFileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View Report
                            </a>
                          </div>
                        </div>

                        {report.verificationStatus === "pending" ? (
                          <div className="flex flex-col gap-2 min-w-[200px]">
                            <textarea
                              placeholder="Verification remarks"
                              className="border border-gray-300 rounded p-2 text-sm h-20"
                              value={remarks[report._id] || ""}
                              onChange={(e) =>
                                setRemarks((prev) => ({
                                  ...prev,
                                  [report._id]: e.target.value,
                                }))
                              }
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  mutation.mutate({
                                    patientId: patient._id,
                                    reportId: report._id,
                                    action: "verify",
                                    remarks: remarks[report._id],
                                  })
                                }
                                disabled={
                                  !remarks[report._id] || mutation.isPending
                                }
                                className={`flex-1 py-1 px-3 rounded text-sm ${
                                  !remarks[report._id]
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                                }`}
                              >
                                {mutation.isPending ? "Verifying..." : "Verify"}
                              </button>
                              <button
                                onClick={() =>
                                  mutation.mutate({
                                    patientId: patient._id,
                                    reportId: report._id,
                                    action: "reject",
                                    remarks: remarks[report._id],
                                  })
                                }
                                disabled={mutation.isPending}
                                className={`flex-1 py-1 px-3 rounded text-sm ${
                                  mutation.isPending
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700 text-white"
                                }`}
                              >
                                {mutation.isPending
                                  ? "Processing..."
                                  : "Reject"}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-600">
                            <p>
                              Verified on:{" "}
                              {report.verifiedAt &&
                                new Date(
                                  report.verifiedAt
                                ).toLocaleDateString()}
                            </p>
                            {report.verificationRemarks && (
                              <p className="mt-1">
                                Remarks: {report.verificationRemarks}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerifyReportPage;
