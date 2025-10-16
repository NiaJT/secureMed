"use client";

import { Formik, Field, FieldArray } from "formik";
import { AlertTriangle, FilePlus, Link } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { axiosInstance } from "@/lib/axios.instance";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IError } from "@/interface/error.interface";
import { updatePatientValidationSchema } from "@/Schema/updatePateintValidationSchema";
import { Report, ReportFormValues } from "@/interface/patientdata.interface";

dotenv.config();
interface PatientDataUpdate {
  name: string;
  age: number;
  gender: string;
  allergies: string[];
  chronicDiseases: string[];
  emergencyContact: {
    name: string;
    phone: string;
  };
  doctor: unknown;
  reports: Report[]; // final type to send to backend
}

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset as string);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    formData
  );

  return response.data.secure_url;
};

const UpdateReportPage = () => {
  const [isUploading, setIsUploading] = useState(false);

  const {
    isPending: isQueryPending,
    data,
    error,
  } = useQuery({
    queryKey: ["fetch-data"],
    queryFn: () => axiosInstance.get("/patient-data/detail"),
  });

  const { mutate, isPending: isUpdatePending } = useMutation({
    mutationKey: ["update-patient-data"],
    mutationFn: async (values: PatientDataUpdate) =>
      await axiosInstance.put("/patient-data/update", values),
    onSuccess: (res) => {
      toast.success(res.data.message);
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message || "Update failed.");
    },
  });

  if (isQueryPending || isUploading || isUpdatePending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">
          {isUploading
            ? "Uploading files..."
            : isQueryPending
            ? "Loading patient data..."
            : "Updating patient data..."}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-red-500 text-lg text-center mb-4">
          {error?.message || "Something went wrong"}
        </p>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to dashboard
        </Link>
      </div>
    );
  }

  const patientData = data?.data?.patientDetails;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 m-4 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add Patient Report
        </h1>

        <Formik<{
          name: string;
          age: number;
          gender: string;
          allergies: string[];
          chronicDiseases: string[];
          emergencyContact: { name: string; phone: string };
          doctor: unknown;
          reports: ReportFormValues[];
        }>
          initialValues={{
            name: patientData?.name || "",
            age: patientData?.age || 0,
            gender: patientData?.gender || "male",
            allergies: patientData?.allergies || [],
            chronicDiseases: patientData?.chronicDiseases || [],
            emergencyContact: {
              name: patientData?.emergencyContact?.name || "",
              phone: patientData?.emergencyContact?.phone || "",
            },
            doctor: patientData?.doctor || null,
            reports: [
              {
                reportTitle: "",
                reportDescription: "",
                reportFileUrl: null,
                uploadedAt: new Date(),
                accessLevel: "doctor-patient",
                verificationStatus: "pending",
                verifiedAt: null,
                verificationRemarks: "",
              },
            ],
          }}
          validationSchema={updatePatientValidationSchema}
          onSubmit={async (values) => {
            setIsUploading(true);
            try {
              // Upload each file if needed
              const reportsWithUrls = await Promise.all(
                values.reports.map(async (report) => {
                  if (!report.reportTitle && !report.reportFileUrl) {
                    return null; // skip empty
                  }

                  let uploadedUrl = "";
                  if (report.reportFileUrl instanceof File) {
                    uploadedUrl = await uploadToCloudinary(
                      report.reportFileUrl
                    );
                  } else if (typeof report.reportFileUrl === "string") {
                    uploadedUrl = report.reportFileUrl; // already uploaded
                  }

                  // return backend-compatible type
                  const formatted: Report = {
                    reportTitle: report.reportTitle,
                    reportDescription: report.reportDescription || "",
                    reportFileUrl: uploadedUrl,
                    uploadedAt: report.uploadedAt,
                    accessLevel: report.accessLevel,
                    verificationStatus: report.verificationStatus,
                    verifiedAt: report.verifiedAt,
                    verificationRemarks: report.verificationRemarks || "",
                  };

                  return formatted;
                })
              );

              // Remove null reports
              const cleanReports = reportsWithUrls.filter(
                (r): r is Report => r !== null
              );

              const finalPayload: PatientDataUpdate = {
                ...values,
                doctor: data?.data?.patientDetails.doctor,
                reports: cleanReports,
              };

              mutate(finalPayload);
            } catch (err) {
              console.error("Unexpected error:", err);
              toast.error("Something went wrong.");
            } finally {
              setIsUploading(false);
            }
          }}
        >
          {({ values, errors, touched, handleSubmit, setFieldValue }) => (
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow rounded-lg p-6"
            >
              {/* Personal Info */}
              <div className="mb-8 rounded-3xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <Field
                      name="name"
                      className={`w-full px-3 py-2 border rounded-md ${
                        touched.name && errors.name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {touched.name && errors.name && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.name as string}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <Field
                      name="age"
                      type="number"
                      className={`w-full px-3 py-2 border rounded-md ${
                        touched.age && errors.age
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {touched.age && errors.age && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.age as string}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <Field
                      as="select"
                      name="gender"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                  Emergency Contact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Name
                    </label>
                    <Field
                      name="emergencyContact.name"
                      className={`w-full px-3 py-2 border rounded-md ${
                        touched.emergencyContact?.name &&
                        errors.emergencyContact?.name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {touched.emergencyContact?.name &&
                      errors.emergencyContact?.name && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.emergencyContact.name as string}
                        </div>
                      )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Field
                      name="emergencyContact.phone"
                      className={`w-full px-3 py-2 border rounded-md ${
                        touched.emergencyContact?.phone &&
                        errors.emergencyContact?.phone
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {touched.emergencyContact?.phone &&
                      errors.emergencyContact?.phone && (
                        <div className="text-red-500 text-xs mt-1">
                          {errors.emergencyContact.phone as string}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              {/* Allergies */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                  Allergies
                </h2>
                <FieldArray name="allergies">
                  {({ push, remove }) => (
                    <div className="space-y-4">
                      {values.allergies.map((_: unknown, index: number) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4"
                        >
                          <Field
                            name={`allergies.${index}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="e.g. Penicillin"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        + Add Allergy
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
              {/* Chronic Diseases */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                  Chronic Diseases
                </h2>
                <FieldArray name="chronicDiseases">
                  {({ push, remove }) => (
                    <div className="space-y-4">
                      {values.chronicDiseases.map(
                        (_: unknown, index: number) => (
                          <div
                            key={index}
                            className="flex items-center space-x-4"
                          >
                            <Field
                              name={`chronicDiseases.${index}`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              placeholder="e.g. Diabetes"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        )
                      )}
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        + Add Chronic Disease
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
              {/* Reports */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                  Medical Reports
                </h2>
                <FieldArray name="reports">
                  {({ push, remove }) => (
                    <div>
                      {values.reports.map((report, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-5 mb-6 bg-gray-50"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium text-gray-700">
                              Report #{index + 1}
                            </h3>
                            {values.reports.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                              >
                                Remove Report
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Report Title
                              </label>
                              <Field
                                name={`reports.${index}.reportTitle`}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select a File
                              </label>
                              <input
                                type="file"
                                onChange={(event) => {
                                  const file = event.currentTarget.files?.[0];
                                  if (file) {
                                    setFieldValue(
                                      `reports.${index}.reportFileUrl`,
                                      file
                                    );
                                  }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          push({
                            reportTitle: "",
                            reportDescription: "",
                            reportFileUrl: null,
                            uploadedAt: new Date(),
                            accessLevel: "doctor-patient",
                            verificationStatus: "pending",
                            verifiedAt: null,
                            verificationRemarks: "",
                          })
                        }
                        className="flex cursor-pointer items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <FilePlus className="mr-1" />
                        Add Another Report
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 cursor-pointer"
                  disabled={isUploading || isUpdatePending}
                >
                  {isUploading ? "Uploading..." : "Submit Report"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateReportPage;
