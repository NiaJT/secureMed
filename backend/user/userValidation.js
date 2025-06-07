import * as yup from "yup";
import dayjs from "dayjs";

export const loginCredentialSchema = yup.object({
  email: yup.string().email().lowercase().trim().required().max(100),
  password: yup.string().min(5).max(100).trim().required(),
});

export const RegisterSchema = yup.object({
  email: yup.string().email().lowercase().trim().required().max(100),
  password: yup.string().min(5).max(100).trim().required(),
  firstName: yup.string().required().trim().max(50),
  lastName: yup.string().required().trim().max(50),
  gender: yup
    .string()
    .lowercase()
    .required()
    .trim()
    .oneOf(["male", "female", "other"]),
  dob: yup.date().max(dayjs().toDate()).notRequired(),
  role: yup
    .string()
    .lowercase()
    .required()
    .trim()
    .oneOf(["user", "respondent", "admin"]),
  address: yup.string().required().trim().max(255),
});
