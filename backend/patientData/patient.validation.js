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

export const updatePatientValidationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  age: yup
    .number()
    .min(0, "Age must be a non-negative number")
    .required("Age is required"),

  gender: yup
    .string()
    .oneOf(["male", "female", "other"])
    .required("Gender is required"),

  emergencyContact: yup.object({
    name: yup.string().required("Emergency contact name is required"),
    phone: yup.string().required("Emergency contact phone is required"),
  }),

  reports: yup
    .array()
    .of(
      yup.object().shape({
        reportTitle: yup
          .string()
          .min(3, "Title must be at least 3 characters")
          .nullable()
          .notRequired(),

        reportDescription: yup.string().nullable().notRequired(),
        reportFileUrl: yup.mixed().nullable().notRequired(),
        uploadedAt: yup.date().nullable().notRequired(),
        accessLevel: yup
          .string()
          .oneOf(["doctor-patient", "private", "admin"])
          .nullable()
          .notRequired(),
        verificationStatus: yup
          .string()
          .oneOf(["pending", "verified", "rejected"])
          .nullable()
          .notRequired(),
        verifiedAt: yup.date().nullable().notRequired(),
        verificationRemarks: yup.string().nullable().notRequired(),
      })
    )
    .nullable()
    .notRequired(),
});
