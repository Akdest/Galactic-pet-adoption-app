"use client";
import React from "react";
import { motion } from "framer-motion";

const HeroPage = ({
  title,
  subtitle,
  backgroundImage,
}: {
  title: string;
  subtitle: string;
  backgroundImage: string;
}) => {
  return (
    <div>
      <section className="bg-gradient-to-r from-gray-800 to-black text-gray-100 text-center py-32 relative overflow-hidden">
        {/* Animated Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
          animate={{ scale: [1, 1.1, 1] }} // Subtle zoom effect
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-800/30 to-blue-600/30 mix-blend-overlay"
          animate={{ opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            className="text-center px-6 md:px-12 "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl font-extrabold leading-tight mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl mb-8 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroPage;
