"use client";
import { motion } from "framer-motion";
import  Link from "next/link";
import { FaRocket, FaPaw, FaStar, FaGlobe, FaUsers, FaHandshake } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-white py-16 px-6 text-black">
      {/* 🌟 Introduction */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold"
        >
          About Galactic Pet Adoption Agency
        </motion.h1>
        <p className="text-gray-700 mt-4 text-lg max-w-3xl mx-auto">
          Bringing intergalactic beings and cosmic creatures together with loving families across the universe.
        </p>
      </div>

      {/* 🌍 Mission & Vision */}
      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {[
          {
            title: "Our Mission",
            text: "To create a universe where every cosmic creature finds a loving home, bridging interstellar gaps with compassion and care.",
            icon: <FaGlobe className="text-blue-400 mx-auto" />,
          },
          {
            title: "Our Vision",
            text: "A future where intergalactic pet adoption is seamless, ethical, and accessible to planetary citizens across galaxies.",
            icon: <FaStar className="text-yellow-400 mx-auto" />,
          },
        ].map((item, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-gray-700 to-gray-600 p-8 rounded-lg shadow-lg w-96 text-center"
          >
            <div className="text-5xl">{item.icon}</div>
            <h3 className="text-3xl text-white font-semibold mt-4">{item.title}</h3>
            <p className="mt-3 text-lg text-gray-300">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* 💜 Why Choose Us? */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">Why Adopt from Us?</h2>
        <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
          Our mission goes beyond adoption – we ensure safe transportation, ethical adoption practices, and ongoing support.
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {[
            { icon: <FaPaw className="text-green-400 mx-auto" />, title: "Ethical Adoption", text: "We prioritize the well-being of our cosmic companions, ensuring they find a loving and nurturing environment." },
            { icon: <FaUsers className="text-purple-400 mx-auto" />, title: "Community Support", text: "Join a passionate network of spacefarers, pet lovers, and cosmic caretakers." },
            { icon: <FaRocket className="text-red-400 mx-auto" />, title: "Intergalactic Transport", text: "Safe, secure, and rapid space travel ensures your pet arrives in perfect condition." },
            { icon: <FaHandshake className="text-orange-400 mx-auto" />, title: "Trusted Partnerships", text: "We collaborate with space agencies, ethical breeders, and rescue organizations." },
          ].map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-gray-700 to-gray-600 p-8 rounded-lg shadow-lg w-80 text-center"
            >
              <div className="text-5xl">{item.icon}</div>
              <h3 className="text-2xl text-white font-semibold mt-4">{item.title}</h3>
              <p className="text-gray-300 mt-3 text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🚀 Call to Action */}
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="text-4xl font-bold"
        >
          Ready to Begin Your Galactic Journey?
        </motion.h2>
        <p className="text-gray-700 mt-4 text-lg max-w-2xl mx-auto">
          Explore the wonders of interstellar companionship and give a cosmic creature a loving home. Join us today and make a difference across the galaxies!
        </p>
        <motion.button 
          whileTap={{ scale: 0.95 }} 
          whileHover={{ scale: 1.1 }} 
          className="mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-pink-700 transition-all"
        >
          <Link href="/pages/Product">
          Start Your Adoption Journey
          </Link>
        </motion.button>
      </div>
    </div>
  );
};

export default AboutUs;
