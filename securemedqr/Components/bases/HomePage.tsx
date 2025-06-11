import React from "react";

const HomePage = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4 text-blue-700">
          Secure Your Medical Records, Effortlessly
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Manage your medical reports securely and access them anytime,
          anywhere.
        </p>
        <div className="space-x-4">
          <a
            href="/add-report"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Your Medical Report
          </a>
          <a
            href="/about"
            className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mb-16">
        {[
          "Secure Storage of Medical Reports",
          "Easy to Add & Manage Your Health Data",
          "Access Anywhere on Any Device",
          "Reliable & Confidential",
        ].map((feature) => (
          <div key={feature} className="p-6 bg-blue-50 rounded-lg shadow">
            <h3 className="font-semibold text-blue-800">{feature}</h3>
          </div>
        ))}
      </section>

      {/* How it Works */}
      <section className="mb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          How It Works
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700 text-lg">
          <li>Create Your Profile</li>
          <li>Upload Medical Reports Securely</li>
          <li>Access Anytime from Any Device</li>
        </ol>
      </section>

      {/* Quick Links */}
      <section className="text-center">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Quick Links
        </h2>
        <div className="space-x-6">
          <a href="/add-report" className="text-blue-600 hover:underline">
            Add Report
          </a>
          <a href="/about" className="text-blue-600 hover:underline">
            About Us
          </a>
          <a href="/contact" className="text-blue-600 hover:underline">
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
