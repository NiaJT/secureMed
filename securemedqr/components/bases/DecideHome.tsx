"use client";
import React, { useEffect, useState } from "react";
import DoctorHomePage from "./DoctorHomePage";
import PatientHomePage from "./PatientHomePage";

const DecideHome = () => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const role = window.localStorage.getItem("role");
    if (role) {
      setUserRole(role);
    }
  }, []);
  if (userRole === "doctor") {
    return <DoctorHomePage />;
  }
  if (userRole === "patient") {
    return <PatientHomePage />;
  }
};

export default DecideHome;
