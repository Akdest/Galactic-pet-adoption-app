"use client";
import React, { useState, useEffect } from "react";
import { alienPets } from "../data/alienPets"; // Adjust the import path as necessary
import { ToastContainer, toast } from "react-toastify"; // Only use this import

import Image from "next/image"; // Import Image component from Next.js
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<number[]>([]); // Cart state (only IDs)
  const [discountCode, setDiscountCode] = useState<string>(""); // Discount code state
  const [discountApplied, setDiscountApplied] = useState<boolean>(false); // Flag to track if discount is applied

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update cart in localStorage
  const updateCart = (updatedCart: number[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart and update localStorage
  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((itemId) => itemId !== id);
    updateCart(updatedCart);
    toast.success("Item removed from cart!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toast-animation", // Custom class for toast animation
    });
  };

  // Get cart items with full details
  const cartItems = alienPets.filter((pet) => cart.includes(pet.id));

  // Handle Proceed to Checkout
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
  

  // Apply discount logic
  const handleApplyDiscount = () => {
    if (discountCode === "DISCOUNT10" && !discountApplied) {
      toast.success("10% Discount applied!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast-animation", // Custom class for toast animation
      });
      setDiscountApplied(true);
    } else {
      toast.error("Invalid or already applied discount code", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast-animation", // Custom class for toast animation
      });
    }
  };

  // Calculate the total with or without discount
  const total = cartItems.reduce((acc, pet) => acc + pet.price, 0);
  const totalWithDiscount = discountApplied ? total * 0.9 : total;

  return (
    <div className="relative bg-white">
      {/* Hero Section with subtle background animation */}
      <section className="bg-gradient-to-r from-gray-800 to-black text-gray-100 text-center py-24 relative animate-background">
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('/one.jpg')" }}></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-6 md:px-12">
            <h1 className="text-5xl font-extrabold leading-tight mb-6 animate-text">Bring Home Your New Alien Friend Today!</h1>
            <p className="text-2xl md:text-3xl mb-8 max-w-xl mx-auto animate-text">
              Adopt a unique alien pet and embark on an intergalactic adventure like never before!
            </p>
          </div>
        </div>
      </section>

      {/* Cart Page Content */}
      <div className="mt-6 px-6 md:px-12 pb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-xl text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cartItems.map((pet) => (
              <div
                key={pet.id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 duration-300"
              >
               <Image
  src={pet.image}
  alt={pet.name}
  width={300} // Adjust as needed
  height={192} // Adjust as needed
  className="w-full h-48 object-cover rounded-md mb-4 transition-transform transform hover:scale-110 duration-300"
/>
                <h3 className="text-xl font-semibold text-gray-800">{pet.name}</h3>
                <p className="text-gray-600">Planet: {pet.planet}</p>
                <p className="text-gray-600">Price: ${pet.price}</p>

                <button
                  onClick={() => removeFromCart(pet.id)}
                  className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105 duration-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Discount Code Input */}
        {cartItems.length > 0 && (
          <div className="mt-6 space-x-4">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="border text-black border-gray-300 rounded-full p-2 w-full md:w-1/3 mb-4"
            />
            <button
              onClick={handleApplyDiscount}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105 duration-300"
            >
              Apply Discount
            </button>
          </div>
          
        )}
<span className="text-gray-600 text-sm">Use code &quot;DISCOUNT10&quot; for 10% off your order!</span>
        {/* Checkout Button */}
        {cartItems.length > 0 && (
          <div className="flex justify-between items-center mt-8">
            <p className="text-lg font-semibold text-gray-800">
              Total: ${totalWithDiscount.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors transform hover:scale-105 duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer />

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes animate-text {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-text {
          animation: animate-text 1s ease-out;
        }

        @keyframes animate-background {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-background {
          animation: animate-background 8s ease infinite;
        }

        .toast-animation {
          animation: toast-slide 0.3s ease-out;
        }

        @keyframes toast-slide {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CartPage;
