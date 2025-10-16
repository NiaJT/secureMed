"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import QRScanner from "./QrScanner";

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
  }, [router]);

  useEffect(() => {
    if (role && role !== "doctor") {
      toast.error("Unauthorized");
      router.replace("/");
    }
  }, [role, router]);

  if (role !== "doctor") {
    return null; // or loading spinner if you want
  }

  return <QRScanner />;
};

export default QrScanSection;
