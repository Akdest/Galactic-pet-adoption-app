"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaPaperPlane, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import VoiceInput from "./Mic"; // Import the VoiceInput component
import { TypeAnimation } from "react-type-animation";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Text from Voice Input
  const handleVoiceText = (text: string) => {
    setFormData((prev) => ({ ...prev, message: prev.message + " " + text }));
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.", { position: "top-center" });
      return;
    }

    setIsSending(true);
    toast.loading("Sending your message...", { position: "top-center", duration: 2000 });

    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      toast.dismiss();
      toast.success("Message sent successfully!", { position: "top-center" });
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setIsSent(false), 3000); // Reset button after 3s
    }, 3000);
  };

  return (
    <div className="relative bg-white text-gray-900 py-16 px-6 md:px-10 lg:px-20">
      {/* Toast Notification Component */}
      <Toaster position="top-center" reverseOrder={false} />

      <motion.h2
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="text-4xl md:text-5xl font-bold text-center mb-10"
>
  <TypeAnimation
    sequence={["Get In Touch", 1000, "Let's Connect", 1000, "Reach Out!", 1000]}
    speed={50}
    repeat={Infinity}
  />
</motion.h2>
      {/* 💫 Contact Cards */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
        {[
          { icon: <FaEnvelope className="text-blue-500 text-3xl md:text-4xl" />, text: "contact@galacticpets.com" },
          { icon: <FaPhone className="text-green-500 text-3xl md:text-4xl" />, text: "+1 234 567 890" },
          { icon: <FaMapMarkerAlt className="text-red-500 text-3xl md:text-4xl" />, text: "Andromeda Galaxy, Space Colony 42" },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-100 border border-gray-300 p-5 md:p-6 rounded-lg shadow-lg w-full sm:w-80 text-center"
          >
            <div className="mb-3 flex justify-center">{item.icon}</div>
            <p className="text-md md:text-lg">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* 📝 Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl mx-auto bg-gray-100 p-6 md:p-8 rounded-lg shadow-lg border border-gray-300"
      >
        <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
          {/* Name Field with Real-Time Animation */}
          {formData.name && (
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-lg md:text-xl font-semibold text-gray-700"
            >
              Hello, {formData.name}! 👋
            </motion.h3>
          )}

          <div className="relative">
            <FaUser className="absolute left-4 top-3 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 pl-12 focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 pl-12 focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-500" />
              </div>
                  {/* Message Field with Voice Input */}
      <div className="relative">
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 text-gray-900 placeholder-gray-500"
          rows={5}
        ></textarea>
        <div className="absolute right-4 bottom-4">
          <VoiceInput onText={handleVoiceText} />
        </div>
      </div>

      {/* 🚀 Send Button with Animated State */}
      <motion.button
        type="submit"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        disabled={isSending}
        className={`w-full flex justify-center items-center gap-3 px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition-all ${
          isSending
            ? "bg-gray-500 cursor-not-allowed text-white"
            : isSent
            ? "bg-green-500 text-white hover:shadow-green-700"
            : "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-blue-700"
        }`}
      >
        {isSending ? (
          <>
            <FaSpinner className="animate-spin" />
            Sending...
          </>
        ) : isSent ? (
          <>
            <FaCheckCircle />
            Sent 
          </>
        ) : (
          <>
            <FaPaperPlane />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  </motion.div>
</div>
); };
export default ContactUs;
