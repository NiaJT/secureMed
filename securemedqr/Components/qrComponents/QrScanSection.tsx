"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import QRScanner from "./QrScanner";
import toast from "react-hot-toast";

const QrScanSection = () => {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userRole = window.localStorage.getItem("role");
    if (userRole) {
      setRole(userRole);
    } else {
      toast.error("Unauthorized");
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    if (role && role !== "doctor") {
      toast.error("Unauthorized");
      router.replace("/");
    }
  }, [role]);

  if (role !== "doctor") {
    return null; // or loading spinner if you want
  }

  return <QRScanner />;
};

export default QrScanSection;
