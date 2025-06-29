"use client";

import { ShieldCheck, User, Stethoscope, LockKeyhole } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <section className="bg-blue-50 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          About SecureMed
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600">
          Your trusted platform for secure and seamless medical data
          verification between patients and doctors.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-justify">
            At SecureMed, our mission is to empower patients by providing them
            with a platform to securely store and share their medical reports,
            and to support doctors in verifying and approving these reports
            efficiently and reliably.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700 text-justify">
            We envision a future where medical data flows securely between
            patients and healthcare professionals, improving trust, accuracy,
            and care quality. SecureMed aims to become a leading e-health
            solution across Nepal and beyond.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
          Why Choose SecureMed?
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-white shadow rounded-lg">
            <ShieldCheck size={40} className="mx-auto text-blue-500 mb-4" />
            <h3 className="font-semibold text-lg">Verified Reports</h3>
            <p className="text-sm text-gray-600 mt-2">
              Doctors verify uploaded reports, ensuring authenticity and trust.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <User size={40} className="mx-auto text-blue-500 mb-4" />
            <h3 className="font-semibold text-lg">Patient-Friendly</h3>
            <p className="text-sm text-gray-600 mt-2">
              Easy interface for uploading and tracking report statuses.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <Stethoscope size={40} className="mx-auto text-blue-500 mb-4" />
            <h3 className="font-semibold text-lg">Doctor Portal</h3>
            <p className="text-sm text-gray-600 mt-2">
              Doctors can access patient data and approve or reject with ease.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <LockKeyhole size={40} className="mx-auto text-blue-500 mb-4" />
            <h3 className="font-semibold text-lg">Encrypted & Secure</h3>
            <p className="text-sm text-gray-600 mt-2">
              QR-based access with encrypted JWT tokens ensures security.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
