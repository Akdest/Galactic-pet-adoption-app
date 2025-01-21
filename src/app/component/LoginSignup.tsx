"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { IconMail, IconLock, IconCheck, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const LoginSignup = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [authError, setAuthError] = useState("");
  const router = useRouter();

  // Mock credentials
  const mockCredentials = {
    email: "a@e.com",
    password: "pass",
  };

  const handleLogin = (email: string, password: string) => {
    if (email === mockCredentials.email && password === mockCredentials.password) {
      localStorage.setItem("auth", "true");
      router.push("./Dashboard");
    } else {
      setAuthError("Invalid email or password. Please try again.");
    }
  };

  const handleSignup = (email: string, password: string) => {
    if (email && password) {
      localStorage.setItem("auth", "true");
      router.push("/Dashboard");
    } else {
      setAuthError("Please fill in all fields to sign up.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden relative mt-16">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/one.jpg')" }}></div>

      <div className="z-10 flex flex-col justify-center items-center w-full max-w-4xl p-8 bg-gradient-to-br from-gray-800 to-gray-700 shadow-2xl rounded-2xl border border-gray-600 space-y-8">
        <div className="text-3xl font-extrabold text-white text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          <span>Welcome Back!!</span>  
          <p className="lg:text-lg text-sm md:text-md text-white mt-2">
            Find your perfect intergalactic companion! <span className="text-teal-500">Join the galaxy now!</span>
          </p>
        </div>

        {/* Tabs (Login and Sign Up) */}
        <div className="flex   space-y-6  flex-wrap justify-center">
          <button
            onClick={() => {
              setActiveTab("login");
              setAuthError("");
            }}
            className={`py-2 px-8 rounded-full text-sm font-bold transition-all w-full  ${
              activeTab === "login"
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                : "bg-gray-600 text-gray-300"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => {
              setActiveTab("signup");
              setAuthError("");
            }}
            className={`py-2 px-8 rounded-full text-sm font-bold transition-all w-full  ${
              activeTab === "signup"
                ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md"
                : "bg-gray-600 text-gray-300"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Display Error Message */}
        {authError && (
          <div className="text-red-500 text-center mt-4">
            <p>{authError}</p>
          </div>
        )}

        {/* Form (Login/Signup) */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          {activeTab === "login" ? (
            <LoginForm onSubmit={handleLogin} />
          ) : (
            <SignupForm onSubmit={handleSignup} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

const LoginForm = ({ onSubmit }: { onSubmit: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password);
      }}
      className="space-y-6"
    >
      <div className="relative">
        <label htmlFor="email" className="text-gray-300 text-sm font-semibold">Email Address</label>
        <div className="relative">
          <IconMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500" />
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full pl-12 py-3 bg-gray-800 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="relative">
        <label htmlFor="password" className="text-gray-300 text-sm font-semibold">Password</label>
        <div className="relative">
          <IconLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500" />
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full pl-12 py-3 bg-gray-800 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-bold hover:shadow-lg transition-shadow"
      >
        Log In
      </button>
    </form>
  );
};

const SignupForm = ({ onSubmit }: { onSubmit: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordChecks({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password);
      }}
      className="space-y-6"
    >
      <div className="relative">
        <label htmlFor="email" className="text-gray-300 text-sm font-semibold">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full pl-4 py-3 bg-gray-800 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative">
        <label htmlFor="password" className="text-gray-300 text-sm font-semibold">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full pl-4 py-3 bg-gray-800 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <div className="mt-4 text-sm space-y-2">
          {Object.entries(passwordChecks).map(([key, isValid]) => (
            <div key={key} className="flex items-center space-x-2">
              {isValid ? (
                <IconCheck className="text-green-500" />
              ) : (
                <IconX className="text-red-500" />
              )}
              <span className={`text-gray-300 ${isValid ? "text-green-400" : ""}`}>
                {key === "length" && "At least 8 characters"}
                {key === "uppercase" && "At least 1 uppercase letter"}
                {key === "number" && "At least 1 number"}
                {key === "specialChar" && "At least 1 special character"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-bold hover:shadow-lg transition-shadow"
      >
        Sign Up
      </button>
    </form>
  );
};

export default LoginSignup;
