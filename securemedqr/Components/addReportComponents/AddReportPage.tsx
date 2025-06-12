"use client";
import { patientValidationSchema } from "@/Schema/userValidationSchema";
import { Formik, Field, FieldArray } from "formik";
import React from "react";

const AddReport = () => {
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
                reportFileUrl: "",
                uploadedAt: new Date(),
                accessLevel: "doctor-patient",
                verificationStatus: "pending",
                verifiedAt: null,
                verificationRemarks: "",
              },
            ],
          }}
          validationSchema={patientValidationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow rounded-lg p-6 "
            >
              {/* Personal Information Section */}
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

              {/* Emergency Contact Section */}
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

              {/* Reports Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                  Medical Reports
                </h2>
                <FieldArray name="reports">
                  {({ push, remove }) => (
                    <div>
                      {values.reports?.map((report, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-5 mb-6 bg-gray-50"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium text-gray-700">
                              Report #{index + 1}
                            </h3>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Remove Report
                            </button>
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
                                Report File URL
                              </label>
                              <Field
                                name={`reports.${index}.reportFileUrl`}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Access Level
                                </label>
                                <Field
                                  as="select"
                                  name={`reports.${index}.accessLevel`}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                  <option value="private">Private</option>
                                  <option value="doctor-patient">
                                    Doctor-Patient
                                  </option>
                                  <option value="admin">Admin</option>
                                </Field>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Verification Status
                                </label>
                                <Field
                                  as="select"
                                  name={`reports.${index}.verificationStatus`}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="verified">Verified</option>
                                  <option value="rejected">Rejected</option>
                                </Field>
                              </div>
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
                            reportFileUrl: "",
                            uploadedAt: new Date(),
                            accessLevel: "doctor-patient",
                            verificationStatus: "pending",
                            verifiedAt: null,
                            verificationRemarks: "",
                          })
                        }
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add Another Report
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
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
export default AddReport;
