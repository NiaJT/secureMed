import * as yup from "yup";

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
