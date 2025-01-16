import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaRocket } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">About Galactic Pet Adoption</h3>
          <p className="text-sm text-gray-600">
            Welcome to the Galactic Pet Adoption Agency, your destination for interstellar companionship.
            Adopt unique alien pets from distant galaxies and embark on unforgettable adventures.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-purple-500 transition">Home</a>
            </li>
            <li>
              <a href="/adoption" className="hover:text-purple-500 transition">Adoption Process</a>
            </li>
            <li>
              <a href="/about" className="hover:text-purple-500 transition">About Us</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-purple-500 transition">Contact</a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-purple-500">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-700">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-700">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-700">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-700">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Galactic Pet Adoption Agency. All Rights Reserved.</p>
        <p className="flex justify-center items-center gap-2">
          Made with <FaRocket className="text-purple-500" /> in the Galaxy!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
