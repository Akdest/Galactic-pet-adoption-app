"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaRocket } from "react-icons/fa";

const Footer = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const openExternalLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-gray-100 text-gray-800 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-4"> Galactic Pet Adoption</h3>
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
              <button onClick={() => navigateTo("/")} className="hover:text-purple-500 transition">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo("/pages/Product")} className="hover:text-purple-500 transition">
                Adoption List
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo("/pages/Cart")} className="hover:text-purple-500 transition">
                Cart
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo("/contact")} className="hover:text-purple-500 transition">
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-purple-500">
            <button onClick={() => openExternalLink("https://facebook.com")} className="hover:text-purple-700">
              <FaFacebook size={20} />
            </button>
            <button onClick={() => openExternalLink("https://twitter.com")} className="hover:text-purple-700">
              <FaTwitter size={20} />
            </button>
            <button onClick={() => openExternalLink("https://instagram.com")} className="hover:text-purple-700">
              <FaInstagram size={20} />
            </button>
            <button onClick={() => openExternalLink("https://linkedin.com")} className="hover:text-purple-700">
              <FaLinkedin size={20} />
            </button>
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
