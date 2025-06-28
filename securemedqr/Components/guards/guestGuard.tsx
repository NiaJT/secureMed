import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GuestGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    const role = window.localStorage.getItem("role");
    if (accessToken && role) {
      router.replace("/");
    } else {
      setIsChecking(false);
    }
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
export default GuestGuard;
