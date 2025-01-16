"use client";
import React, { useState , useEffect} from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus, FaRocket, FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Example of additional features
const allFeatures = [
  "Adventurous", "Cuddly", "Playful", "Intelligent", "Brave", "Loyal", "Energetic", "Gentle", "Affectionate"
];

// Alien pet data with price and size
const adoptionList = [
  {
    name: "Zogglor",
    planet: "Zetronia",
    image: "https://via.placeholder.com/400x300/8e44ad/ffffff?text=Zogglor",
    quantity: 0,
    features: ["Adventurous", "Fast", "Smart"],
    size: "Medium",
    age: 2, // Age in years
    rating: 4.5,
    price: 250,
    availability: true, // True = Available, False = Sold out
  },
  {
    name: "Fluffernox",
    planet: "Fluffon-9",
    image: "https://via.placeholder.com/400x300/16a085/ffffff?text=Fluffernox",
    quantity: 0,
    features: ["Cuddly", "Gentle", "Affectionate"],
    size: "Small",
    age: 1,
    rating: 4.0,
    price: 150,
    availability: true,
  },
  {
    name: "Vortigon",
    planet: "Vorgar",
    image: "https://via.placeholder.com/400x300/e67e22/ffffff?text=Vortigon",
    quantity: 0,
    features: ["Playful", "Energetic", "Loyal"],
    size: "Large",
    age: 3,
    rating: 5.0,
    price: 300,
    availability: false,
  },
  {
    name: "Xenor",
    planet: "Xenos-5",
    image: "/one.jpg",
    quantity: 0,
    features: ["Curious", "Fast", "Strong"],
    size: "Medium",
    age: 4,
    rating: 3.5,
    price: 200,
    availability: true,
  },
  {
    name: "Quorg",
    planet: "Targon-7",
    image: "/one.jpg",
    quantity: 0,
    features: ["Intelligent", "Alert", "Loyal"],
    size: "Small",
    age: 1,
    rating: 4.2,
    price: 180,
    availability: true,
  },
  {
    name: "Zynthar",
    planet: "Zyphos-8",
    image: "/one.jpg",
    quantity: 0,
    features: ["Brave", "Strong", "Resilient"],
    size: "Large",
    age: 5,
    rating: 4.8,
    price: 280,
    availability: false,
  },
];

const AdoptionList = () => {
    const [wishlist, setWishlist] = useState<{ [key: string]: boolean }>({});
  const [pets, setPets] = useState(adoptionList);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice] = useState(500);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
//   const [isInWishlist, setIsInWishlist] = useState<boolean>(false);


 
  // Toggle Wishlist and show toast notifications
  const handleWishlistToggle = (petName: string) => {
    // Toggle the wishlist state for the clicked pet
    setWishlist((prevWishlist) => {
      return { ...prevWishlist, [petName]: !prevWishlist[petName] };
    });
  };

  useEffect(() => {
    // Show toast only when a pet's wishlist status changes
    Object.keys(wishlist).forEach((petName) => {
      if (wishlist[petName]) {
        toast.success(`${petName} added to Wishlist`);
      } else {
        toast.info(`${petName} removed from Wishlist`);
      }
    });
  }, [wishlist]); // Dependency on wishlist state

  
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

  // Filter pets based on price, size, and features
  const filteredPets = pets.filter((pet) => {
    const isWithinPriceRange = pet.price >= minPrice && pet.price <= maxPrice;
    const hasSelectedFeatures = selectedFeatures.every((feature) => pet.features.includes(feature));
    const isSelectedSize = selectedSize.length === 0 || selectedSize.includes(pet.size);
    return isWithinPriceRange && hasSelectedFeatures && isSelectedSize;
  });

  // Handle feature filter toggle
  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((item) => item !== feature) : [...prev, feature]
    );
  };

  // Handle size filter toggle
  const handleSizeToggle = (size: string) => {
    setSelectedSize((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
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
        Adoption List
      </motion.h2>

      {/* Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-8 px-4 py-6 bg-gray-100 rounded-lg shadow-md"
      >
        <h3 className="text-xl text-black font-semibold mb-4">Filters</h3>

        {/* Price Filter */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Price Range</label>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-purple-400 to-pink-600 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>

        {/* Feature Filter */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Features</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {allFeatures.map((feature) => (
              <button
                key={feature}
                onClick={() => handleFeatureToggle(feature)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                  selectedFeatures.includes(feature)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-200 text-gray-700 border-gray-300"
                } hover:bg-blue-500 hover:text-white transition`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">Size</label>
          <div className="flex gap-4 mt-2">
            {["Small", "Medium", "Large"].map((size) => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                  selectedSize.includes(size)
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-gray-200 text-gray-700 border-gray-300"
                } hover:bg-green-500 hover:text-white transition`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pets Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet, index) => (
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
            {/* Pet Image */}
            <img src={pet.image} alt={pet.name} className="w-full h-40 object-cover rounded-md" />

            {/* Pet Name and Planet */}
            <h3 className="text-xl font-semibold text-gray-800">{pet.name}</h3>
            <p className="text-sm text-gray-600">{pet.planet}</p>

            {/* Availability */}
            <div
              className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-semibold ${
                pet.availability ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {pet.availability ? "Available" : "Sold Out"}
            </div>

            {/* Pet Features */}
            <div className="text-sm text-gray-500">
              {pet.features.join(", ")}
            </div>

            {/* Pet Age and Rating */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Age: {pet.age} years</span>
              <div>{renderStars(pet.rating)}</div>
            </div>

            {/* Price and Add to Wishlist */}
            <div className="flex items-center gap-4 mt-4 w-full justify-between">
              <div className="text-lg font-semibold text-gray-800">${pet.price}</div>
              <button
      onClick={() => handleWishlistToggle(pet.name)}
      className={`p-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
        wishlist[pet.name] // Check if the pet is in the wishlist
          ? "bg-pink-200 text-pink-600 hover:bg-pink-600"
          : "bg-pink-600 text-white hover:bg-pink-700 hover:text-pink-100"
      }`}
    >
      <FaHeart />
    </button>

            </div>

            {/* Quantity Control */}
            <div className="flex gap-2 items-center mt-3">
              <button
                onClick={() => handleQuantityChange(index, -1)}
                className="bg-black px-2 py-1 rounded-md hover:bg-gray-300"
              >
                <FaMinus className="text-white hover:text-black"/>
              </button>
              <span className="text-black">{pet.quantity}</span>
              <button
                onClick={() => handleQuantityChange(index, 1)}
                className="bg-black px-2 py-1 rounded-md hover:bg-gray-300 "
              >
                <FaPlus className="text-white hover:text-black" />
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

export default AdoptionList;
