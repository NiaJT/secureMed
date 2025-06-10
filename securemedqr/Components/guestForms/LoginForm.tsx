"use client";

import React from "react";
import { Button } from "../ui/button";
import { Formik } from "formik";
import { loginCredentialSchema } from "@/Schema/userValidationSchema";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios.instance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IError } from "@/interface/error.interface";
interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationKey: ["get-login-data"],
    mutationFn: async (values: ILoginForm) => {
      return await axiosInstance.post("/user/login", values);
    },
    onSuccess: (res) => {
      console.log(res);
      const accessToken = res?.data?.accessToken;
      const firstName = res?.data?.userDetails?.firstName;
      const role = res?.data?.userDetails?.role;
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("firstName", firstName);
      window.localStorage.setItem("role", role);
      toast.success(`Welcome ${firstName}!`);
      router.push("/");
    },
    onError: (error: IError) => {
      toast.error(error.response.data.message);
    },
  });
  return (
    <div className="w-full h-screen flex bg-gradient-to-tr from-amber-300 via-amber-400 to-amber-500 text-gray-900">
      {/* Left panel with branding info */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-12 bg-white bg-opacity-20 backdrop-blur-lg rounded-l-3xl shadow-lg">
        <h2 className="text-4xl font-extrabold mb-6 text-amber-900">
          Welcome to SecureMed
        </h2>
        <p className="text-lg text-amber-900 max-w-md mb-8">
          SecureMed is your trusted platform for safe and reliable medical QR
          code solutions. Manage patient data securely, verify credentials
          instantly, and streamline your workflow.
        </p>
      </div>

      {/* Right panel with login form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white rounded-r-3xl shadow-xl p-12">
        <h1 className="text-3xl font-bold mb-8 text-amber-900">
          Login to SecureMed
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginCredentialSchema}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-sm flex flex-col gap-6"
            >
              <label
                htmlFor="email"
                className="font-semibold text-amber-900 text-lg"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
                className="shadow-sm"
              />
              {errors.email && touched.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}

              <label
                htmlFor="password"
                className="font-semibold text-amber-900 text-lg"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                value={values.password}
                onChange={handleChange}
                className="shadow-sm"
              />
              {errors.password && touched.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}

              <Button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 transition-colors duration-200 text-white font-semibold py-3 rounded-lg shadow-md"
              >
                Login
              </Button>
            </form>
          )}
        </Formik>
        <p className="mt-6 text-sm text-amber-900 opacity-80">
          © 2025 SecureMed. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
