import * as yup from "yup";
import dayjs from "dayjs";

export const loginCredentialSchema = yup.object({
  email: yup.string().email().lowercase().trim().required().max(100),
  password: yup.string().min(5).max(100).trim().required(),
});

export const RegisterSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8).required("Password is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  dob: yup
    .date()
    .max(new Date(), "DOB cannot be in the future")
    .required("Date of birth is required"),
  gender: yup
    .string()
    .oneOf(["male", "female", "other"])
    .required("Gender is required"),
  role: yup
    .string()
    .oneOf(["patient", "doctor", "admin"])
    .required("Role is required"),
  address: yup.string().required("Address is required"),
  licenseNumber: yup.string().notRequired(),
  specialization: yup.string().notRequired(),
});
