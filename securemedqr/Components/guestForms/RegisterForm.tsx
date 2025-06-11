"use client";

import React from "react";
import { Formik } from "formik";
import { RegisterSchema } from "@/Schema/userValidationSchema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios.instance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IError } from "@/interface/error.interface";

interface IRegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  role: string;
  address: string;
  licenseNumber?: string;
  specialization?: string;
}

const RegisterForm = () => {
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (values: IRegisterForm) => {
      return await axiosInstance.post("/user/register", values);
    },
    onSuccess: () => {
      toast.success("Registration successful!");
      router.push("/login");
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message || "Registration failed");
    },
  });

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-tr from-blue-100 via-sky-200 to-sky-300 text-gray-900">
      <div className="flex flex-col md:flex-row items-center justify-center rounded-3xl shadow-2xl overflow-hidden">
        {/* Welcome Panel */}
        <div className=" hidden md:flex flex-col justify-center items-center w-[400px] h-[600px]  bg-sky-200 bg-opacity-20 backdrop-blur-lg text-center p-8">
          <h2 className="text-3xl font-extrabold text-amber-900 mb-4">
            Join SecureMed
          </h2>
          <p className="text-md text-amber-800 leading-relaxed">
            SecureMed empowers medical professionals and patients with secure QR
            code technology. Register now to manage your medical data
            efficiently and safely.
          </p>
        </div>

        {/* Registration Form Panel */}
        <div className="w-[400px] h-[600px] bg-white p-10 flex flex-col items-center overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6 text-amber-900">Register</h1>

          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              dob: "",
              gender: "male",
              role: "patient",
              address: "",
              licenseNumber: "",
              specialization: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => mutate(values)}
          >
            {({ handleChange, handleSubmit, values, touched, errors }) => (
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-3"
              >
                <Input
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                />
                {touched.email && errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}

                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
                {touched.password && errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}

                <Input
                  name="firstName"
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                />
                {touched.firstName && errors.firstName && (
                  <p className="text-sm text-red-600">{errors.firstName}</p>
                )}

                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                />
                {touched.lastName && errors.lastName && (
                  <p className="text-sm text-red-600">{errors.lastName}</p>
                )}

                <Input
                  name="dob"
                  type="date"
                  value={values.dob}
                  onChange={handleChange}
                />
                {touched.dob && errors.dob && (
                  <p className="text-sm text-red-600">{errors.dob}</p>
                )}

                <select
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-md shadow-sm"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {touched.gender && errors.gender && (
                  <p className="text-sm text-red-600">{errors.gender}</p>
                )}

                <select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded-md shadow-sm"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
                {touched.role && errors.role && (
                  <p className="text-sm text-red-600">{errors.role}</p>
                )}

                <Input
                  name="address"
                  placeholder="Address"
                  value={values.address}
                  onChange={handleChange}
                />
                {touched.address && errors.address && (
                  <p className="text-sm text-red-600">{errors.address}</p>
                )}

                {values.role === "doctor" && (
                  <>
                    <Input
                      name="licenseNumber"
                      placeholder="License Number"
                      value={values.licenseNumber}
                      onChange={handleChange}
                    />
                    <Input
                      name="specialization"
                      placeholder="Specialization"
                      value={values.specialization}
                      onChange={handleChange}
                    />
                  </>
                )}

                <Button
                  type="submit"
                  className="mt-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg"
                >
                  {isPending ? "Registering..." : "Register"}
                </Button>
              </form>
            )}
          </Formik>

          <p className="mt-4 text-sm text-amber-900 opacity-80">
            Already have an account?{" "}
            <a href="/login" className="underline hover:text-amber-700">
              Login
            </a>
          </p>
          <p className="mt-2 text-xs text-amber-900 opacity-70">
            © 2025 SecureMed. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
