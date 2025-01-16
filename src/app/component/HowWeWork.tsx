"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRocket, FaShieldAlt, FaHandshake } from "react-icons/fa"; // Example icons from react-icons

// Sample How We Work Data
const howWeWork = [
  {
    title: "Launch Your Pet Adventure",
    description: "Browse through our galaxy of pets, select your perfect match, and start the adoption journey! Explore the many exciting possibilities in finding your new companion.",
    icon: <FaRocket className="text-4xl text-indigo-600" />,
  },
  {
    title: "Safe and Secure",
    description: "We ensure a safe and smooth adoption process with complete transparency and secure transactions. Our team verifies all pets to ensure they meet our standards for health and compatibility.",
    icon: <FaShieldAlt className="text-4xl text-green-600" />,
  },
  {
    title: "Seamless Adoption",
    description: "From selecting your pet to completing the adoption, we guide you every step of the way. Our streamlined process ensures you have all the information you need to make a confident decision.",
    icon: <FaHandshake className="text-4xl text-orange-600" />,
  },
];

// Card Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Text Animation Variants for the section
const sectionTitleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const HowWeWork = () => {
  const [gradient, setGradient] = useState<string>( // Initial gradient background
    "radial-gradient(circle at center, rgba(255, 255, 255, 1), rgba(255,255,255,1))"
  );

  // Spotlight Effect on Mouse Move
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      setGradient(
        `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))`
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="py-20 px-4"
      style={{ background: gradient, transition: "background 0.3s ease-in-out" }}
    >
      {/* Section Title with Animation */}
      <motion.h2
        variants={sectionTitleVariants}
        initial="hidden"
        animate="visible"
        className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-12"
      >
        How We Work
      </motion.h2>

      {/* Cards Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {howWeWork.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
            }}
            className="relative p-6 bg-white rounded-lg shadow-lg flex flex-col items-center gap-6 transition-all duration-300"
          >
            {/* Icon with background */}
            <div className="flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-300 p-6 rounded-full">
              {item.icon}
            </div>
            {/* Title */}
            <motion.h3
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="text-xl font-semibold text-gray-800 text-center"
            >
              {item.title}
            </motion.h3>
            {/* Description */}
            <motion.p
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="text-sm text-gray-600 text-center"
            >
              {item.description}
            </motion.p>
            {/* Hover effect (shadow, scale) on card */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowWeWork;
