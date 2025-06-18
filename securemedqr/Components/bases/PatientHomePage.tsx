import React from "react";
import {
  FilePlus,
  ShieldCheck,
  Smartphone,
  Lock,
  UserPlus,
  CloudUpload,
  HeartPulse,
  ClipboardCheck,
  Globe,
  Server,
  BarChart2,
} from "lucide-react";

const PatientHomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white mt-4 rounded">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="inline-block bg-blue-500/20 px-4 py-1 rounded-full mb-4">
                <p className="text-sm font-medium">HIPAA Compliant</p>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Secure Your Medical Records, <br className="hidden md:block" />
                <span className="text-blue-200">Effortlessly</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                Manage your medical reports securely and access them anytime,
                anywhere with our HIPAA-compliant platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/add-report"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
                >
                  <FilePlus className="w-5 h-5" />
                  Add Medical Report
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
                    <HeartPulse className="w-16 h-16 text-white mb-4" />
                    <h3 className="text-white text-xl font-bold text-center">
                      Your Health Data, Securely Managed
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

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                value: "10K+",
                label: "Secure Reports",
                icon: <FilePlus className="w-8 h-8 text-blue-500 mx-auto" />,
              },
              {
                value: "24/7",
                label: "Accessibility",
                icon: <Globe className="w-8 h-8 text-green-500 mx-auto" />,
              },
              {
                value: "99.9%",
                label: "Uptime",
                icon: <Server className="w-8 h-8 text-purple-500 mx-auto" />,
              },
              {
                value: "4.9/5",
                label: "User Satisfaction",
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

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              Why Choose SecureMed?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform is designed with your privacy and convenience in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Military-Grade Security",
                description: "End-to-end encryption for all your medical data",
                icon: <Lock className="w-10 h-10 text-blue-500" />,
                color: "bg-blue-100",
              },
              {
                title: "Easy Management",
                description: "Simple interface to organize your health records",
                icon: <CloudUpload className="w-10 h-10 text-green-500" />,
                color: "bg-green-100",
              },
              {
                title: "Anywhere Access",
                description: "Available on all your devices 24/7",
                icon: <Smartphone className="w-10 h-10 text-purple-500" />,
                color: "bg-purple-100",
              },
              {
                title: "HIPAA Compliant",
                description: "Meets all healthcare privacy regulations",
                icon: <ShieldCheck className="w-10 h-10 text-indigo-500" />,
                color: "bg-indigo-100",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 ${feature.color}`}
              >
                <div className="mb-5">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started in just three simple steps
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                description:
                  "Sign up in less than a minute with secure authentication",
                icon: <UserPlus className="w-10 h-10 text-blue-500" />,
              },
              {
                step: "2",
                title: "Upload Medical Reports",
                description: "Securely upload documents from any device",
                icon: <CloudUpload className="w-10 h-10 text-green-500" />,
              },
              {
                step: "3",
                title: "Access Anytime",
                description:
                  "View your records from anywhere with internet access",
                icon: <Smartphone className="w-10 h-10 text-purple-500" />,
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

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from people who have transformed their health data management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Chronic Illness Patient",
                quote:
                  "Finally, all my medical records in one secure place. It's been a game-changer for managing my complex health needs.",
                avatar: "SJ",
              },
              {
                name: "Dr. Michael Chen",
                role: "Cardiologist",
                quote:
                  "I recommend SecureMed to all my patients. The ability to securely share records saves us so much time.",
                avatar: "MC",
              },
              {
                name: "James Wilson",
                role: "Frequent Traveler",
                quote:
                  "As someone who travels constantly, having access to my medical history from anywhere gives me incredible peace of mind.",
                avatar: "JW",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-blue-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.quote}</p>
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
                  name: "Add Report",
                  link: "/add-report",
                  icon: <FilePlus className="w-5 h-5" />,
                },
                {
                  name: "About Us",
                  link: "/about",
                  icon: <ShieldCheck className="w-5 h-5" />,
                },
                {
                  name: "Contact",
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

export default PatientHomePage;
