import React from "react";
import {
  QrCode,
  Download,
  Mail,
  Share2,
  Printer,
  FileText,
} from "lucide-react";

const QrPage = () => {
  // Mock patient data
  const patientData = {
    name: "Sarah Johnson",
    dob: "1985-03-15",
    patientId: "P-7284-2023",
    reportId: "R-8291-2023",
    reportDate: "2023-10-15",
    lastAccessed: "2023-10-20 14:30",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">
            Secure Medical Report Access
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your medical records securely with healthcare providers using
            this QR code
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with patient info */}
          <div className="bg-blue-700 text-white px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{patientData.name}</h2>
                <p className="text-blue-100 text-sm">
                  Patient ID: {patientData.patientId} | DOB: {patientData.dob}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-200">
                  Report ID: {patientData.reportId}
                </p>
                <p className="text-xs text-blue-200">
                  Generated: {patientData.reportDate}
                </p>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* QR Code Section */}
              <div className="md:w-1/2 flex flex-col items-center">
                <div className="bg-white border-4 border-blue-200 rounded-xl p-6 shadow-md mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="bg-white p-4 rounded-md flex justify-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48 flex items-center justify-center">
                        <QrCode className="w-32 h-32 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Scan this QR code to access the medical report
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      <Download className="w-4 h-4" />
                      Download QR
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                      <Printer className="w-4 h-4" />
                      Print
                    </button>
                  </div>
                </div>
              </div>

              {/* Information Section */}
              <div className="md:w-1/2">
                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Report Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Report Type:</span>
                      <span className="font-medium">
                        Full Medical Examination
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Issued By:</span>
                      <span className="font-medium">Dr. Michael Chen</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Date of Exam:</span>
                      <span className="font-medium">October 10, 2023</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Last Accessed:</span>
                      <span className="font-medium">
                        {patientData.lastAccessed}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Access Count:</span>
                      <span className="font-medium">3 times</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Security Notice
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          This QR code provides access to sensitive medical
                          information. Only share with authorized healthcare
                          providers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">
                    Share Report
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                      <Mail className="w-4 h-4" />
                      Send via Email
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      Twitter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">
                This QR code will expire on November 15, 2023
              </p>
              <div className="flex gap-4 mt-2 md:mt-0">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Report an Issue
                </button>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Generate New QR
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            How to use this QR code
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              {
                step: 1,
                title: "Show to your doctor",
                description: "Present this QR code at your appointment",
              },
              {
                step: 2,
                title: "Scan with smartphone",
                description: "Use your device's camera to scan the code",
              },
              {
                step: 3,
                title: "Access securely",
                description: "View your medical report on any device",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mb-3 mx-auto">
                  {item.step}
                </div>
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrPage;
