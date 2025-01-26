"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { alienPets } from "../data/alienPets";
import { motion } from "framer-motion";
import { FaShoppingCart, FaSearch, FaFilter, FaRupeeSign, FaRocket, FaMicrophone } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image"

// Define the SpeechRecognition interface
interface SpeechRecognition {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

// Define the event interface for SpeechRecognitionEvent
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

// Define the event interface for SpeechRecognitionErrorEvent
interface SpeechRecognitionErrorEvent {
  error: string;
}

const Product = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPlanet, setSelectedPlanet] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

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
      toast.error(`${name} Removed from Cart`, { position: "top-center" }); // Trigger error toast
    } else {
      setCart([...cart, id]);
      toast.success(`${name} Added to Cart`, { position: "top-center" }); // Trigger success toast
    }
  };

  // Filter pets based on the selected criteria
  const filteredPets = alienPets.filter((pet) => {
    return (
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedPlanet ? pet.planet === selectedPlanet : true) &&
      pet.price >= minPrice &&
      pet.price <= maxPrice
    );
  });

  const startListening = () => {
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new (SpeechRecognitionConstructor as unknown as { new (): SpeechRecognition })();

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      toast.success("Speech recognized!", { position: "top-center" });
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      toast.error(`Error: ${event.error}`);
    };

    recognition.start();
    toast("Listening... Speak now!", { position: "top-center" });
  };

  return (
    <div className="p-6 bg-white">
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-6 w-full">

        {/* Search Input */}
        <div className="relative w-full max-w-md flex items-center border border-gray-300 rounded-full p-2 focus-within:ring-2 focus-within:ring-green-500">
          <FaSearch className="text-black ml-3" />
          <input
            type="text"
            placeholder="Search for an alien pet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-4 rounded-full text-black outline-none bg-transparent"
          />
          <FaMicrophone
            className="text-black ml-3 cursor-pointer"
            onClick={startListening}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center md:flex-nowrap items-center gap-4 text-black w-full md:w-auto">

          {/* Planet Filter */}
          <div className="relative flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg shadow-lg">
            <FaFilter className="text-white text-lg" />
            <select
              value={selectedPlanet}
              onChange={(e) => setSelectedPlanet(e.target.value)}
              className="px-4 py-2 rounded-md border-none bg-white text-black cursor-pointer shadow-md outline-none transition-all duration-300 hover:bg-gray-100"
            >
              <option value="">🌍 Select Planet</option>
              <option value="Mars">🚀 Mars</option>
              <option value="Venus">🔥 Venus</option>
              <option value="Jupiter">🪐 Jupiter</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-indigo-600 p-2 rounded-lg shadow-lg">
            <FaFilter className="text-white text-lg" />

            <div className="flex gap-2">
              {/* Min Price Input */}
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="px-4 py-2 rounded-md border-none w-24 sm:w-28 md:w-32 text-black outline-none transition-all duration-300 bg-white shadow-md focus:ring-2 focus:ring-purple-500 hover:bg-gray-100"
                placeholder="Min ₹"
              />

              {/* Max Price Input */}
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="px-4 py-2 rounded-md border-none w-24 sm:w-28 md:w-32 text-black outline-none transition-all duration-300 bg-white shadow-md focus:ring-2 focus:ring-indigo-500 hover:bg-gray-100"
                placeholder="Max ₹"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPets.map((pet) => (
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
            <p className="text-gray-800 mt-2">{pet.shortDescription}</p>

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
                  <span key={index} className={`text-yellow-400 ${index < pet.rating ? 'text-yellow-500' : 'text-gray-400'}`} >
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

              <Link
                href={`../pages/Prod/${pet.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-all duration-300"
                >
                  <FaRocket /> View Pet
                </motion.button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Product;
