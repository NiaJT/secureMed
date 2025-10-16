"use client";

import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer
      id="bottom"
      className="w-full flex flex-col bottom-0 bg-gray-900 text-gray-200 pt-10 mt-10"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Mission */}
        <div>
          <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
            <ShieldCheck className="text-blue-400" size={24} />
            SecureMed
          </div>
          <p className="text-sm text-gray-400">
            Empowering patients and doctors with secure, verified medical data
            exchange.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/doctor" className="hover:text-blue-400">
                Doctor Portal
              </Link>
            </li>
            <li>
              <Link href="/patient" className="hover:text-blue-400">
                Patient Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              support@securemed.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              +977 9800000000
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              Maitighar, Kathmandu
            </li>
          </ul>
        </div>

        {/* Newsletter / Future use */}
        <div>
          <h3 className="text-white font-semibold mb-3">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-3">
            Get health tips & system updates.
          </p>
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 rounded bg-gray-800 text-gray-200 text-sm outline-none mb-2"
          />
          <button className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded text-sm font-medium">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500 px-6 pb-6">
        © {new Date().getFullYear()} SecureMed. All rights reserved.
      </div>
    </footer>
  );
};
