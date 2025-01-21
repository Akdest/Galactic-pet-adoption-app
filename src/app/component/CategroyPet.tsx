"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Sample Pet Categories Data with Slogans
const petCategories = [
  {
    title: "Adventurous Dogs",
    slogan: "Find your brave companion!",
    image: "/categdog.jpg",
    link: "/pages/AdoptionList",
  },
  {
    title: "Cuddly Cats",
    slogan: "Soft paws, warm hearts.",
    image: "/categcat.jpg",
    link: "/pages/AdoptiopnList",
  },
  {
    title: "Playful Rabbits",
    slogan: "Hop into happiness!",
    image: "/categrabbit.jpg",
    link: "/pages/AdoptionList",
  },
];

// Hero Animation Variants
const heroTextVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export const CategoryPets = () => {
  const [gradient, setGradient] = useState<string>(
    "radial-gradient(circle at center, rgba(255, 255, 255, 1), rgba(255, 255, 255,1))"
  );

  // Spotlight Effect on Mouse Move
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      setGradient(
        `radial-gradient(circle at ${x}% ${y}%,rgba(255, 239, 255, 1), rgba(255, 255, 255, 1))`
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
      {/* Hero Section with Animated Slogan */}
      <motion.h1
        variants={heroTextVariants}
        initial="hidden"
        animate="visible"
        className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-4"
      >
        Galactic Pets Await You!
      </motion.h1>
      <motion.p
        variants={heroTextVariants}
        initial="hidden"
        animate="visible"
        className="text-center text-lg sm:text-xl font-medium text-gray-700 mb-8"
      >
        Discover the perfect companion for your cosmic adventures.
      </motion.p>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Large Image */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
          className="relative w-full md:w-2/3 h-96 rounded-lg overflow-hidden shadow-lg"
        >
          <Link href={petCategories[0].link}>
            <Image
              src={petCategories[0].image}
              alt={petCategories[0].title}
              fill
              className="object-cover"
            />
          </Link>
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
            <motion.h2 className="text-lg sm:text-xl font-semibold">{petCategories[0].title}</motion.h2>
            <motion.p className="text-sm sm:text-base">{petCategories[0].slogan}</motion.p>
          </div>
        </motion.div>

        {/* Right Vertical Images */}
        <div className="flex flex-col w-full md:w-1/3 gap-8">
          {petCategories.slice(1).map((category, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
              }}
              className="relative h-48 sm:h-56 rounded-lg overflow-hidden shadow-lg"
            >
              <Link href={category.link}>
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
              </Link>
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                <motion.h2 className="text-lg sm:text-xl font-semibold">{category.title}</motion.h2>
                <motion.p className="text-sm sm:text-base">{category.slogan}</motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPets;
