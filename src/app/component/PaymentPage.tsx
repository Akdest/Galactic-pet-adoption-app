"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaCreditCard, FaPaypal, FaGooglePay, FaCheckCircle, FaTag, FaBitcoin } from "react-icons/fa";
import ReactConfetti from "react-confetti";
import { useWindowSize } from 'react-use';

const PaymentPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [cryptoAddress, setCryptoAddress] = useState("");
  const { width, height } = useWindowSize();

  const handleApplyCoupon = () => {
    if (couponCode.trim() === "DISCOUNT10") {
      setDiscount(10);
      toast.success("Coupon Applied! You saved 10%");
    } else {
      toast.error("Invalid Coupon Code");
    }
  };

  const handlePayment = () => {
    if (
      paymentMethod === "creditCard" &&
      (cardDetails.number.length < 16 || !cardDetails.expiry || !cardDetails.cvv)
    ) {
      toast.error("Please enter valid card details.");
      return;
    }

    if (paymentMethod === "upi" && !upiId) {
      toast.error("Please enter a valid UPI ID.");
      return;
    }

    if (paymentMethod === "crypto" && !cryptoAddress) {
      toast.error("Please enter a valid Crypto Address.");
      return;
    }

    toast.success("Processing Payment...", { autoClose: 1500 });
    setTimeout(() => setIsSuccess(true), 2000);
  };
  const handleContinueShopping = () => {
    // Simulate adopting a pet when the button is clicked
    const newActivity = { 
      title: `Adopted New Pet`, 
      description: "You successfully adopted a new alien pet! 🚀" 
      , timestamp: new Date().toISOString()
    };

    // Store the new activity in localStorage
    const existingActivities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
    localStorage.setItem("recentActivities", JSON.stringify([newActivity, ...existingActivities]));

    // Redirect to the products page
    window.location.href = "/pages/Product";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-black">
      {isSuccess && <ReactConfetti width={width} height={height} />}
      <motion.h1 
        className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-500"
      >
        Secure Checkout
      </motion.h1>
      
      {isSuccess ? (
        <motion.div className="flex flex-col items-center justify-center text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-500 mt-2">Redirecting to Order Success...</p>
      
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out mt-4 hover:bg-gradient-to-l hover:from-teal-400 hover:to-blue-500"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </motion.button>
      </motion.div>
      
      ) : (
        <motion.div className="bg-white p-6 rounded-lg shadow-2xl max-w-md w-full text-gray-900">
          <h2 className="text-2xl font-semibold mb-4">Select Payment Method</h2>
          <div className="grid grid-cols-3 gap-2">
            {["creditCard", "paypal", "googlePay", "upi", "crypto"].map((method) => (
              <motion.button 
                key={method}
                className={`p-3 rounded-lg flex items-center justify-center gap-2 transition text-sm ${
                  paymentMethod === method ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                whileHover={{ scale: 1.1 }}
                onClick={() => setPaymentMethod(method)}
              >
                {method === "creditCard" && <FaCreditCard />}
                {method === "paypal" && <FaPaypal />}
                {method === "googlePay" && <FaGooglePay />}
                {method === "crypto" && <FaBitcoin />}
                {method === "upi" && <FaGooglePay />}
                {method.replace(/([A-Z])/g, ' $1').trim()}
              </motion.button>
            ))}
          </div>

          {paymentMethod === "creditCard" && (
            <motion.div className="mt-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 border rounded-lg mb-2"
                maxLength={16}
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 p-2 border rounded-lg mb-2"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 p-2 border rounded-lg mb-2"
                  maxLength={3}
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                />
              </div>
            </motion.div>
          )}

          {paymentMethod === "upi" && (
            <motion.div className="mt-4">
              <input
                type="text"
                placeholder="Enter UPI ID"
                className="w-full p-2 border rounded-lg mb-2"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </motion.div>
          )}

          {paymentMethod === "crypto" && (
            <motion.div className="mt-4">
              <input
                type="text"
                placeholder="Enter Crypto Address"
                className="w-full p-2 border rounded-lg mb-2"
                value={cryptoAddress}
                onChange={(e) => setCryptoAddress(e.target.value)}
              />
            </motion.div>
          )}

          <div className="flex gap-2 my-3">
            <input
              type="text"
              placeholder="Coupon Code"
              className="w-full p-2 border rounded-lg"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              className="bg-green-500 text-white p-2 rounded-lg flex items-center gap-1"
              onClick={handleApplyCoupon}
            >
              <FaTag /> Apply
            </motion.button>
          </div>

          <div className="border-t pt-3 mt-2">
            <p className="text-lg font-medium">Total: <span className="text-blue-600">$100</span></p>
            {discount > 0 && <p className="text-green-600">Discount Applied: -${discount}</p>}
            <p className="text-lg font-semibold">Final Amount: <span className="text-blue-600">${100 - discount}</span></p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition mt-4 flex items-center justify-center gap-2"
            onClick={handlePayment}
          >
            <FaCheckCircle /> Pay Now
          </motion.button>
        </motion.div>
      )}
      <ToastContainer />
    </div>
  );
};

export default PaymentPage;
