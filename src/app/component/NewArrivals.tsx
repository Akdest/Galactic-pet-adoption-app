"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus, FaRocket, FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Alien pet data
const alienPets = [
  {
    name: "Zogglor",
    planet: "Zetronia",
    image: "https://via.placeholder.com/400x300/8e44ad/ffffff?text=Zogglor",
    quantity: 0,
    features: ["Adventurous", "Fast", "Smart"],
    rating: 4.5,
  },
  {
    name: "Fluffernox",
    planet: "Fluffon-9",
    image: "https://via.placeholder.com/400x300/16a085/ffffff?text=Fluffernox",
    quantity: 0,
    features: ["Cuddly", "Gentle", "Affectionate"],
    rating: 4.0,
  },
  {
    name: "Vortigon",
    planet: "Vorgar",
    image: "https://via.placeholder.com/400x300/e67e22/ffffff?text=Vortigon",
    quantity: 0,
    features: ["Playful", "Energetic", "Loyal"],
    rating: 5.0,
  },
  {
    name: "Xenor",
    planet: "Xenos-5",
    image: "/one.jpg",
    quantity: 0,
    features: ["Curious", "Fast", "Strong"],
    rating: 3.5,
  },
  {
    name: "Quorg",
    planet: "Targon-7",
    image: "/one.jpg",
    quantity: 0,
    features: ["Intelligent", "Alert", "Loyal"],
    rating: 4.2,
  },
  {
    name: "Zynthar",
    planet: "Zyphos-8",
    image: "/one.jpg",
    quantity: 0,
    features: ["Brave", "Strong", "Resilient"],
    rating: 4.8,
  },
];

const NewestArrivals = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [pets, setPets] = useState(alienPets);

  // Toggle Wishlist and show toast notifications
  const handleWishlistToggle = (petName: string) => {
    if (wishlist.includes(petName)) {
      setWishlist(wishlist.filter((item) => item !== petName));
      toast.info(`${petName} removed from Wishlist`);
    } else {
      setWishlist([...wishlist, petName]);
      toast.success(`${petName} added to Wishlist`);
    }
  };

  // Handle quantity changes for each pet
  const handleQuantityChange = (index: number, change: number) => {
    const updatedPets = [...pets];
    const newQuantity = updatedPets[index].quantity + change;
    if (newQuantity >= 0) {
      updatedPets[index].quantity = newQuantity;
      setPets(updatedPets);
    }
  };

  // Render star ratings
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FaStar className="text-yellow-500 opacity-50" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={fullStars + i} className="text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className="py-10 px-4 bg-white transition-all duration-500">
      <ToastContainer position="top-right" autoClose={3000} />

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-8"
      >
        Newest Alien Pet Arrivals
      </motion.h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.3 },
            }}
            className="relative p-3 bg-white rounded-lg shadow-md flex flex-col items-center gap-4"
          >
            <button
              onClick={() => handleWishlistToggle(pet.name)}
              className={`absolute top-3 right-3 border-2 rounded-full p-1 
                ${wishlist.includes(pet.name) ? "bg-pink-600 border-pink-600 " : "bg-white border-pink-600"} 
                hover:text-pink-700 focus:outline-none transition`}
              aria-label="Add to Wishlist"
            >
              <FaHeart size={20}className={`hover:text-pink-700 focus:outline-none transition text-pink-200 `} 
                />
            </button>

            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-48 object-cover rounded-lg"
            />

            <h3 className="text-lg font-semibold text-gray-800 text-center">{pet.name}</h3>

            <p className="text-sm text-gray-600 text-center">Origin: {pet.planet}</p>

            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
              {pet.features.map((feature, i) => (
                <span key={i} className="bg-blue-200 px-3 py-1 rounded-full">
                  {feature}
                </span>
              ))}
            </div>

            <div className="text-center">{renderStars(pet.rating)}</div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(index, -1)}
                className="bg-gray-200 p-1 rounded-full text-gray-600 hover:bg-gray-300"
              >
                <FaMinus />
              </button>
              <span className="text-sm font-semibold">{pet.quantity}</span>
              <button
                onClick={() => handleQuantityChange(index, 1)}
                className="bg-gray-200 p-1 rounded-full text-gray-600 hover:bg-gray-300"
              >
                <FaPlus />
              </button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-6 py-2 rounded-lg flex items-center shadow-lg hover:shadow-pink-700 hover:scale-105 transition-all duration-300"
              >
                <FaRocket /> Adopt
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-all duration-300"
              >
                <FaShoppingCart /> Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewestArrivals;
