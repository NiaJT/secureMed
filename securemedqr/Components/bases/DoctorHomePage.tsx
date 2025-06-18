import React from "react";
import {
  ClipboardCheck,
  FileCheck2,
  ShieldCheck,
  Smartphone,
  Lock,
  UserCheck,
  CloudCheck,
  Server,
  BarChart2,
} from "lucide-react";

const DoctorHomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white mt-4 rounded">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="inline-block bg-blue-500/20 px-4 py-1 rounded-full mb-4">
                <p className="text-sm font-medium">Doctor Dashboard</p>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Review & Verify <br className="hidden md:block" />
                <span className="text-blue-200">Medical Reports</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                As a verified healthcare professional, securely access and
                verify patient-submitted reports on our HIPAA-compliant
                platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/verify-reports"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
                >
                  <FileCheck2 className="w-5 h-5" />
                  Verify Reports
                </a>
                <a
                  href="/about"
                  className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <ClipboardCheck className="w-5 h-5" />
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 w-80 h-80 flex items-center justify-center">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl w-64 h-64 flex flex-col items-center justify-center p-6 shadow-xl">
                    <CloudCheck className="w-16 h-16 text-white mb-4" />
                    <h3 className="text-white text-xl font-bold text-center">
                      Verified, Trusted & Secure
                    </h3>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                  <ShieldCheck className="w-10 h-10 text-green-500" />
                </div>
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                  <Smartphone className="w-10 h-10 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                value: "5K+",
                label: "Reports Verified",
                icon: <FileCheck2 className="w-8 h-8 text-blue-500 mx-auto" />,
              },
              {
                value: "100+",
                label: "Doctors Registered",
                icon: <UserCheck className="w-8 h-8 text-green-500 mx-auto" />,
              },
              {
                value: "99.9%",
                label: "Uptime",
                icon: <Server className="w-8 h-8 text-purple-500 mx-auto" />,
              },
              {
                value: "4.9/5",
                label: "Doctor Satisfaction",
                icon: <BarChart2 className="w-8 h-8 text-indigo-500 mx-auto" />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-blue-50 rounded-xl border border-blue-100"
              >
                {stat.icon}
                <p className="text-3xl font-bold text-blue-800 mt-3">
                  {stat.value}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              Workflow for Doctors
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              How you can verify patient records securely and efficiently.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {[
              {
                step: "1",
                title: "Sign In",
                description:
                  "Use your verified doctor account to access the dashboard",
                icon: <UserCheck className="w-10 h-10 text-blue-500" />,
              },
              {
                step: "2",
                title: "Review Pending Reports",
                description: "See all unverified reports from patients",
                icon: <ClipboardCheck className="w-10 h-10 text-green-500" />,
              },
              {
                step: "3",
                title: "Verify & Comment",
                description:
                  "Approve reports and leave professional feedback or notes",
                icon: <FileCheck2 className="w-10 h-10 text-purple-500" />,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-2xl shadow-md w-full max-w-sm flex flex-col items-center text-center"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  {step.step}
                </div>
                <div className="mb-5">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">
              Quick Access
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                {
                  name: "Verify Reports",
                  link: "/verify-reports",
                  icon: <FileCheck2 className="w-5 h-5" />,
                },
                {
                  name: "Doctor Profile",
                  link: "/doctor/profile",
                  icon: <UserCheck className="w-5 h-5" />,
                },
                {
                  name: "Contact Admin",
                  link: "/contact",
                  icon: <Smartphone className="w-5 h-5" />,
                },
                {
                  name: "Privacy Policy",
                  link: "/privacy",
                  icon: <Lock className="w-5 h-5" />,
                },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all shadow-sm hover:shadow-md duration-300"
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorHomePage;
