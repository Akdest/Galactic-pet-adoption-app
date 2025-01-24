"use client";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import { alienPetsnew } from "../data/newarrivals";
import { FaShoppingCart, FaRocket, FaRupeeSign } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

// Define a Pet interface

const NewestArrivals: React.FC = () => {
  const [cart, setCart] = useState<number[]>([]);
  

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



  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <Toaster position="top-right" reverseOrder={false} />
      <motion.h2 className="text-center text-6xl font-semibold text-black mb-6">
        Newly Landed
      </motion.h2>
      <motion.p className="text-center lg:text-lg md:text-md sm:text-sm text-gray-700 mb-12">
        Meet the latest intergalactic companions ready for adoption! Explore unique alien pets from across the cosmos.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {alienPetsnew.map((pet) => (
          <div
            key={pet.id}
            className="bg-white border-b-4 border-gray-200 hover:border-gray-600 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 group"
          >
            <Image
              src={pet.image}
              alt={pet.name}
              width={500}
              height={200}
              className="w-full h-48 object-cover rounded-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-80"
            />

            <h2 className="text-xl font-bold text-black mt-2">{pet.name}</h2>
            <p className="text-black">{pet.species} from {pet.planet}</p>
            <p className="text-black mt-2">{pet.shortDescription}</p>

            {/* Additional Features */}
            <div className="flex items-center mt-3">
              <span className="text-black font-semibold mr-2 flex items-center">
                <FaRupeeSign className="mr-1" />{pet.price}
              </span>
            </div>

            {/* Ratings */}
            <div className="flex items-center mt-2">
              <span className="text-black font-semibold mr-1">Rating:</span>
              <div className="flex">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className={`text-yellow-400 ${index < pet.rating ? 'text-yellow-500' : 'text-gray-400'}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Features as Comma Separated */}
            <div className="mt-3">
              <p className="text-black">Features:</p>
              <p className="text-black">{pet.features.join(", ")}</p>
            </div>

            <div className="flex justify-between mt-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleCart(pet.id, pet.name)}
                className={`${
                  cart.includes(pet.id)
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : "bg-gradient-to-r from-green-500 to-teal-500"
                } text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-all duration-300`}
              >
                <FaShoppingCart /> {cart.includes(pet.id) ? "Remove" : "Add to Cart"}
              </motion.button>

              <Link href={`../pages/Prod/${pet.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center shadow-lg hover:shadow-pink-700 hover:scale-105 transition-all duration-300"
                >
                  <FaRocket /> Adopt Now
                </motion.button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewestArrivals;
