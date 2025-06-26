"use client";
import {
  Info,
  FilePlus,
  Phone,
  Home,
  User,
  LogOut,
  ClipboardCheck,
  View,
  QrCode,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState<string>("");
  const [role, setRole] = useState<"doctor" | "patient" | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("firstName");
    const storedRole = localStorage.getItem("role");
    if (storedName) setFirstName(storedName);
    if (storedRole === "doctor" || storedRole === "patient") {
      setRole(storedRole);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isProfileOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  const handleLogout = () => {
    localStorage.clear();
    router.replace("/login");
    setIsProfileOpen(false);
    setIsMobileOpen(false);
  };

  // Common links
  const commonLinks = [
    { name: "Home", link: "/", icon: <Home className="w-5 h-5" /> },
    { name: "About Us", link: "/about", icon: <Info className="w-5 h-5" /> },
    {
      name: "Contact Us",
      link: "/contact",
      icon: <Phone className="w-5 h-5" />,
    },
  ];

  // Role-specific links
  const patientLinks = [
    {
      name: "Add Medical Report",
      link: "/add-report",
      icon: <FilePlus className="w-5 h-5" />,
    },
    {
      name: "My Report",
      link: "/medical-data",
      icon: <View className="w-5 h-5" />,
    },
  ];

  const doctorLinks = [
    {
      name: "Verify Reports",
      link: "/verify-reports",
      icon: <ClipboardCheck className="w-5 h-5" />,
    },
    {
      name: "Scan Qr",
      link: "/medical-data/scanqr",
      icon: <QrCode className="w-5 h-5" />,
    },
  ];

  const navLinks = [
    ...commonLinks,
    ...(role === "doctor"
      ? doctorLinks
      : role === "patient"
      ? patientLinks
      : []),
  ];

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold text-white flex items-center"
          >
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <div className="bg-blue-400 w-8 h-8 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
            SecureMed
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-6 items-center text-white text-base font-medium">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-500/30 ${
                      pathname === item.link
                        ? "bg-blue-500/30 font-semibold border-l-4 border-yellow-300 pl-2"
                        : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 relative" ref={profileRef}>
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
              aria-label="User menu"
            >
              <div className="hidden sm:block text-right">
                <Avatar className="border-2 border-white group-hover:border-purple-300 transition-colors">
                  <AvatarImage src="/default-avatar.png" alt={firstName} />
                  <AvatarFallback className="bg-purple-500">
                    {firstName ? (
                      firstName.charAt(0).toUpperCase()
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 overflow-hidden transform transition-transform duration-200 scale-100 opacity-100">
                <div className="py-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="w-5 h-5 text-blue-600" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Settings</span>
                  </Link>
                </div>
                <button
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 border-t"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Mobile Drawer */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-80 bg-blue-700 z-50 transform transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-5 border-b border-blue-600 flex items-center gap-3">
            <Avatar className="border-2 border-white">
              <AvatarImage src="/default-avatar.png" alt={firstName} />
              <AvatarFallback className="bg-blue-500">
                {firstName ? (
                  firstName.charAt(0).toUpperCase()
                ) : (
                  <User className="w-5 h-5" />
                )}
              </AvatarFallback>
            </Avatar>
          </div>

          <ul className="py-4">
            {navLinks.map((item) => (
              <li key={item.name} className="border-b border-blue-600">
                <Link
                  href={item.link}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-4 p-5 text-white hover:bg-blue-600 ${
                    pathname === item.link
                      ? "bg-blue-600 font-semibold border-l-4 border-yellow-300"
                      : ""
                  }`}
                >
                  <span className="text-blue-300">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <li className="border-t border-blue-600 mt-4 pt-4 px-5">
              <button
                className="flex items-center gap-4 w-full p-3 text-white bg-blue-800 rounded-lg hover:bg-blue-900"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
