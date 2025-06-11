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
import Link from "next/link";

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
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-tr from-blue-100 via-sky-200 to-sky-300 text-gray-900">
      <div className="flex flex-col md:flex-row items-center justify-center rounded-3xl shadow-2xl overflow-hidden">
        {/* Welcome Panel */}
        <div className="hidden md:flex flex-col justify-center items-center w-[400px] h-[500px] bg-sky-200 bg-opacity-20 backdrop-blur-lg text-center p-8">
          <h2 className="text-3xl font-extrabold text-amber-900 mb-4">
            Welcome to SecureMed
          </h2>
          <p className="text-md text-amber-800 leading-relaxed">
            Your trusted platform for secure, efficient medical QR code
            solutions. <br /> Easily manage patient data and verify credentials
            — all in one place.
          </p>
        </div>

        {/* Login Panel */}
        <div className="w-[400px] h-[500px] bg-white p-10 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-6 text-amber-900">
            Login to SecureMed
          </h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginCredentialSchema}
            onSubmit={(values) => mutate(values)}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="font-semibold text-amber-900 text-sm"
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
                    className="mt-1"
                  />
                  {errors.email && touched.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="font-semibold text-amber-900 text-sm"
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
                    className="mt-1"
                  />
                  {errors.password && touched.password && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="mt-2 bg-amber-600 hover:bg-amber-700 transition-colors duration-200 text-white font-semibold py-2 rounded-lg"
                >
                  {isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
            )}
          </Formik>

          <Link
            className="mt-4 underline text-sm text-amber-600 opacity-80 hover:text-amber-900"
            href="/register"
          >
            Don’t have an account? Register here.
          </Link>

          <p className="mt-4 text-xs text-amber-900 opacity-80">
            © 2025 SecureMed. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
