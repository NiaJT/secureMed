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
  doctor: yup.string().nullable().notRequired(),

  reports: yup.array().of(reportSchema).default([]),
});

const updateReportSchema = yup.object({
  reportTitle: yup.string().trim().min(3).max(100).notRequired(),
  reportDescription: yup.string().trim().nullable().notRequired(),
  reportFileUrl: yup.mixed().notRequired(),
  uploadedAt: yup.date().notRequired(),
  accessLevel: yup
    .string()
    .oneOf(["private", "doctor-patient", "admin"])
    .notRequired(),
  verificationStatus: yup
    .string()
    .oneOf(["pending", "verified", "rejected"])
    .notRequired(),
  verifiedAt: yup.date().nullable().notRequired(),
  verificationRemarks: yup.string().trim().nullable().notRequired(),
});

export const updatePatientValidationSchema = yup.object({
  name: yup.string().notRequired(),
  age: yup.number().positive().integer().notRequired(),
  gender: yup.string().oneOf(["male", "female", "other"]).notRequired(),
  allergies: yup.array().of(yup.string()).notRequired(),
  chronicDiseases: yup.array().of(yup.string()).notRequired(),
  emergencyContact: yup
    .object({
      name: yup.string().notRequired(),
      phone: yup.string().notRequired(),
    })
    .notRequired(),
  doctor: yup.string().nullable().notRequired(),
  reports: yup.array().of(updateReportSchema).notRequired(),
});
