import * as yup from "yup";

const reportSchema = yup.object({
  reportTitle: yup
    .string()
    .trim()
    .min(3)
    .max(100)
    .required("Report title is required"),
  reportDescription: yup.string().trim().nullable(),
  reportFileUrl: yup
    .string()
    .url("Invalid file URL")
    .required("Report file URL is required"),
  uploadedAt: yup.date().default(() => new Date()),
  accessLevel: yup
    .string()
    .oneOf(["private", "doctor-patient", "admin"])
    .default("doctor-patient"),
  verificationStatus: yup
    .string()
    .oneOf(["pending", "verified", "rejected"])
    .default("pending"),
  verifiedAt: yup.date().nullable(),
  verificationRemarks: yup.string().trim().nullable(),
});

export const patientValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  age: yup.number().positive().integer().required("Age is required"),
  gender: yup
    .string()
    .oneOf(["male", "female", "other"])
    .required("Gender is required"),
  allergies: yup.array().of(yup.string()),
  chronicDiseases: yup.array().of(yup.string()),
  emergencyContact: yup.object({
    name: yup.string().required("Emergency contact name is required"),
    phone: yup.string().required("Emergency contact phone is required"),
  }),
  doctor: yup.string().required("Doctor ID is required"),
  reports: yup.array().of(reportSchema).default([]),
});
