"use client";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { alienPetsnew } from "../data/newarrivals"; // Adjust the import path
import { FaShoppingCart, FaRocket, FaRupeeSign, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const NewestArrivals: React.FC = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false); // To control modal visibility
  const [selectedPet, setSelectedPet] = useState<any>(null); // To store the selected pet for the modal

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const toggleCart = (id: number, name: string) => {
    if (cart.includes(id)) {
      setCart(cart.filter((petId) => petId !== id));
      toast.error(`${name} Removed from Cart`);
    } else {
      setCart([...cart, id]);
      toast.success(`${name} Added to Cart`);
    }
  };

  const openModal = (pet: any) => {
    setSelectedPet(pet); // Set selected pet details
    setShowModal(true); // Show modal
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
    setSelectedPet(null); // Clear selected pet
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <Toaster position="top-right" reverseOrder={false} />

      <motion.h2
  
  transition={{ duration: 1, ease: "easeOut" }}
  className="text-center text-4xl sm:text-4xl lg:text-6xl font-extrabold text-black mb-6 sm:mb-8"
>
  Newly Landed
</motion.h2>

<motion.p
  
  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
  className="text-center sm:text-sm md:text-md lg:text-lg text-gray-700 mb-12"
>
  Discover our newest and most exciting arrivals, each one a perfect companion waiting to join your family. Explore the unique and wonderful alien pets ready for adoption!
</motion.p>

      <div className="grid bg-white grid-cols-1 mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
        {alienPetsnew.map((pet) => (
          <motion.div
            key={pet.id}
            className="bg-white text-black p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pet Image */}
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            {/* Pet Details */}
            <h3 className="text-xl font-semibold">{pet.name}</h3>
            <p className="text-sm text-gray-500">🌍 Planet: <span className="font-semibold">{pet.planet}</span></p>
            <p className="text-sm text-gray-500">🔢 Age: <span className="font-semibold">{pet.age} years</span></p>
            <p className="text-sm text-gray-500 flex items-center">💰 Price: <span className="font-semibold flex ml-1"><FaRupeeSign />{pet.price}</span></p>
            <p className="text-sm text-gray-500">⭐ Features: <span className=" text-gray-500">{pet.features.join(", ")}</span></p>
            <p className="text-sm text-gray-500">🌟 Rating: <span className="font-semibold">{pet.rating}</span></p>

            {/* Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
  {/* Add/Remove Cart Button */}
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={() => toggleCart(pet.id, pet.name)}
    className={`${
      cart.includes(pet.id)
        ? "bg-gradient-to-r from-red-500 to-red-600"
        : "bg-gradient-to-r from-green-500 to-teal-500"
    } text-white px-5 py-2 rounded-lg flex items-center justify-between gap-2 hover:scale-105 transition-all duration-300`}
  >
    <FaShoppingCart /> <span>{cart.includes(pet.id) ? "Remove" : "Add to Cart"}</span>
  </motion.button>

  {/* Adopt Now Button */}
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={() => openModal(pet)} // Open modal and pass selected pet
    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-5 py-2 rounded-lg flex items-center justify-between shadow-lg hover:shadow-pink-700 hover:scale-105 transition-all duration-300"
  >
    <FaRocket /> <span>Adopt Now</span>
  </motion.button>
</div>

          </motion.div>
        ))}
      </div>

      {/* Full-Screen Modal */}
      {showModal && selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white text-black p-8 rounded-lg w-full h-full flex flex-col lg:flex-row overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black text-5xl font-semibold transition-all transform hover:text-red-600 hover:scale-110 focus:outline-none"
            >
              &times; {/* Close button */}
            </button>

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row w-full">
              {/* Left side - Image */}
              <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                <img
                  src={selectedPet.image}
                  alt={selectedPet.name}
                  className="lg:w-auto w-full h-auto object-cover rounded-md"
                />

                {/* Additional Images */}
                <p className="text-gray-500 mt-6">🛸 Additional Images:</p>
                <div className="flex flex-wrap gap-4">
                  {selectedPet.additionalImages.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Additional image ${index + 1}`}
                      className="w-1/4 sm:w-1/5 h-auto rounded-md"
                    />
                  ))}
                </div>
              </div>

              {/* Right side - Details */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h2 className="text-3xl font-semibold">{selectedPet.name}</h2>
                <p className="text-gray-500">🌍 Planet: <span className="font-semibold">{selectedPet.planet}</span></p>
                <p className="text-gray-500">🔢 Age: <span className="font-semibold">{selectedPet.age} years</span></p>
                <p className="text-gray-500">💰 Price: <span className="font-semibold">${selectedPet.price}</span></p>
                <p className="text-gray-500">⭐ Features: <span className="text-gray-500">{selectedPet.features.join(", ")}</span></p>
                <p className="text-gray-500">🌟 Rating: <span className="font-semibold">{selectedPet.rating}</span></p>
                <p className="text-gray-500">📝 Description: <span className="font-semibold">{selectedPet.description}</span></p>

                {/* Additional Pet Details */}
                <div className="mt-6">
                  <p className="text-gray-500 mt-4">💬 Behavior: <span className="font-semibold">{selectedPet.behavior}</span></p>
                  <p className="text-gray-500">🌱 Preferred Environment: <span className="font-semibold">{selectedPet.preferredEnvironment}</span></p>
                  <p className="text-gray-500">🔧 Training Difficulty: <span className="font-semibold">{selectedPet.trainingDifficulty}</span></p>
                  <p className="text-gray-500">💖 Temperament: <span className="font-semibold">{selectedPet.temperament}</span></p>
                  <p className="text-gray-500">🎉 Fun Fact: <span className="font-semibold">{selectedPet.funFact}</span></p>
                </div>

                {/* Buttons inside Modal */}
                <div className="mt-6 flex flex-col gap-4 justify-center">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleCart(selectedPet.id, selectedPet.name)} // Do not close modal after adding to cart
                    className={`w-full py-2 px-6 rounded-lg text-center flex items-center justify-center gap-2 transition-all duration-300 ${
                      cart.includes(selectedPet.id)
                        ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        : "bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-teal-600"
                    } text-white font-semibold hover:scale-105`}
                  >
                    <FaShoppingCart />
                    <span>{cart.includes(selectedPet.id) ? "Remove from Cart" : "Add to Cart"}</span>
                  </motion.button>

                  {/* Proceed to Checkout Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toast.success("Proceeding to checkout...")} // Implement the actual checkout functionality here
                    className="w-full py-2 px-6 rounded-lg text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300"
                  >
                    <FaArrowRight />
                    <span>Proceed to Checkout</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewestArrivals;
