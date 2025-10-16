"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
export const AuthGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    const role = window.localStorage.getItem("role");

    if (!role || !accessToken) {
      router.replace("/login");
      window.localStorage.clear();
    }
    if (accessToken) {
      const session = jwtDecode(accessToken)?.exp || 0;
      const date = Date.now() / 1000;
      if (!session || session < date) {
        toast.error("Login Session Expired");
        router.replace("/login");
        window.localStorage.clear();
      }
      console.log(session, date);
    }

    setIsChecking(false);
  }, [router]);
  if (isChecking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h5 className="text-center text-gray-600">
          Checking your authentication...
        </h5>
      </div>
    );
  }
  return children;
};
export default AuthGuard;
