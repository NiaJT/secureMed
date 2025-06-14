"use client";

import { patientValidationSchema } from "@/Schema/patientValidationSchema";
import { Formik, Field, FieldArray } from "formik";
import { FilePlus } from "lucide-react";
import React from "react";
import axios from "axios";

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your_upload_preset");

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/your_cloud_name/upload",
    formData
  );

  return response.data.secure_url;
};

const AddReportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 m-4 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add Patient Report
        </h1>

        <Formik
          initialValues={{
            name: "",
            age: 0,
            gender: "male",
            allergies: [],
            chronicDiseases: [],
            emergencyContact: {
              name: "",
              phone: "",
            },
            doctor: null,
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
          validationSchema={patientValidationSchema}
          onSubmit={async (values) => {
            try {
              const reportsWithUrls = await Promise.all(
                values.reports.map(async (report) => {
                  const uploadedUrl = await uploadToCloudinary(
                    report.reportFileUrl
                  );
                  return {
                    ...report,
                    reportFileUrl: uploadedUrl,
                  };
                })
              );

              const finalPayload = {
                ...values,
                reports: reportsWithUrls,
              };

              console.log("Final Payload:", finalPayload);

              // Submit finalPayload to your backend here
            } catch (err) {
              console.error("File upload failed:", err);
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
                        {errors.name}
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
                        {errors.age}
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
                          {errors.emergencyContact.name}
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
                          {errors.emergencyContact.phone}
                        </div>
                      )}
                  </div>
                </div>
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
                >
                  Submit Report
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddReportPage;
