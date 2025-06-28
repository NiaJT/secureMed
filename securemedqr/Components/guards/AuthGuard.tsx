"use client";

import { useRouter } from "next/navigation";
import {useEffect, useState } from "react";

const AuthGuard=({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)=>{
    const router=useRouter();
    const [isChecking,setIsChecking]=useState(true);
    useEffect(()=>{
const accessToken=window.localStorage.getItem("accessToken");
const role=window.localStorage.getItem("role");
if(!role || !accessToken){
router.replace("/login");
window.localStorage.clear();
}
setIsChecking(false);
    },[router]);
    if(isChecking){
        return  (
      <div className="flex justify-center items-center h-screen">
        <h5 className="text-center text-gray-600">
          Checking your authentication...
        </h5>
      </div>
    );
    }
    return children;
}
export default AuthGuard;