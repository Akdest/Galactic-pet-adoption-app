"use client";

import { useParams, useRouter } from "next/navigation";
import { alienPets } from "../../../data/alienPets";
import Image from "next/image";
import { FaShoppingCart, FaArrowRight, FaRupeeSign, FaShareAlt, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Pet {
  id: number;
  name: string;
  image: string;
  additionalImages: string[];
  planet: string;
  age: number;
  price: number;
  features: string[];
  rating: number;
  description: string;
  adoptionSuccessRate: number;
  lifeExpectancy: number;
  stock: number;
}
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from "react-share";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import NavbarOther from "@/app/component/NavbarOther";
import Footer from "@/app/component/Footer";

const ProductDetails = () => {
  const { name } = useParams();
  const router = useRouter();
  const product = alienPets.find(
    (pet) => pet.name.toLowerCase().replace(/\s+/g, "-") === name
  );

  const [cart, setCart] = useState<number[]>([]);
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

   

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  // Function to toggle cart item
  const toggleCart = (id: number, name: string) => {
    if (cart.includes(id)) {
      // Remove from cart if already in the cart
      setCart(cart.filter((itemId) => itemId !== id));
      toast.info(`${name} removed from cart!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // Add to cart if not in the cart
      setCart([...cart, id]);
      toast.success(`${name} added to cart!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toast-animation", // Custom class for toast animation
    });

    // Redirect to Payment page after a short delay
    setTimeout(() => {
      window.location.href = "/pages/PaymentPage"; // Adjust the path as needed
    }, 1500);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div>
      <NavbarOther />
      <div className="bg-white text-black p-8 mt-16 w-full flex flex-col lg:flex-row gap-x-8">
        {/* Left Section: Image */}
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-md"
          />
          <p className="text-gray-500 mt-6">🛸 Additional Images:</p>
          <div className="flex flex-wrap gap-4">
            {product.additionalImages.map((image: string, index: number) => (
              <Image
                key={index}
                src={image}
                alt={`Additional image ${index + 1}`}
                width={200}
                height={200}
                className="w-1/4 sm:w-1/5 h-auto rounded-md"
              />
            ))}
          </div>
        </div>
        <button
          className="absolute top-16 right-8 bg-gray-200 hover:bg-red-600 hover:text-white text-gray-700 p-2 rounded-full transition-all shadow-md"
          onClick={() => router.back()}
        >
          <FaArrowLeft />
        </button>
        {/* Right Section: Details */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">{product.name}</h2>
            <button
              className="text-blue-500 text-xl p-2 hover:text-blue-700 transition-all duration-200"
              onClick={() => setShowShareOptions(!showShareOptions)}
            >
              <FaShareAlt />
            </button>
          </div>

          {/* Share Options */}
          {showShareOptions && (
            <div className="flex gap-3 mt-2">
              <FacebookShareButton url={shareUrl}>
                <FaFacebook className="text-blue-600 text-2xl cursor-pointer hover:text-blue-800" />
              </FacebookShareButton>

              <TwitterShareButton url={shareUrl} title={`Adopt ${product.name} now!`}>
                <FaTwitter className="text-blue-400 text-2xl cursor-pointer hover:text-blue-600" />
              </TwitterShareButton>

              <WhatsappShareButton url={shareUrl} title={`Meet ${product.name}! 🛸`}>
                <FaWhatsapp className="text-green-500 text-2xl cursor-pointer hover:text-green-700" />
              </WhatsappShareButton>

              <LinkedinShareButton url={shareUrl} title={`Amazing alien pet: ${product.name}`} summary={product.description}>
                <FaLinkedin className="text-blue-700 text-2xl cursor-pointer hover:text-blue-900" />
              </LinkedinShareButton>
            </div>
          )}

          <p className="text-gray-500">🌍 Planet: <span className="font-semibold">{product.planet}</span></p>
          <p className="text-gray-500">🔢 Age: <span className="font-semibold">{product.age} years</span></p>
          <p className="text-gray-500 flex items-center">💰 Price: <span className="font-semibold flex items-center"><FaRupeeSign className="ml-1" /> {product.price}</span></p>
          <p className="text-gray-500">⭐ Features: <span className="text-gray-500">{product.features.join(", ")}</span></p>
          <p className="text-gray-500">🌟 Rating: <span className="font-semibold">{product.rating}</span></p>
          <p className="text-gray-500">📝 Description: <span className="font-semibold">{product.description}</span></p>

          {/* New Features */}
          <p className="text-gray-500">🏆 Adoption Success Rate: <span className="font-semibold">{product.adoptionSuccessRate}%</span></p>
          <p className="text-gray-500">⏳ Life Expectancy: <span className="font-semibold">{product.lifeExpectancy} years</span></p>
          <p className="text-gray-500">📦 Availability: <span className={`font-semibold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-4 justify-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleCart(product.id, product.name)}
              className={`w-full py-2 px-6 rounded-lg text-center flex items-center justify-center gap-2 transition-all duration-300 ${cart.includes(product.id) ? "bg-red-600" : "bg-green-500"} text-white font-semibold hover:scale-105`}
            >
              <FaShoppingCart />
              <span>{cart.includes(product.id) ? "Remove from Cart" : "Add to Cart"}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
              className="w-full py-2 px-6 rounded-lg text-white font-semibold flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 transition-all duration-300"
            >
              <FaArrowRight />
              <span>Proceed to Checkout</span>
            </motion.button>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default ProductDetails;
