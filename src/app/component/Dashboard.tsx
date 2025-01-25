"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {  IconMenu, IconX } from "@tabler/icons-react";
import { alienPets } from "../data/alienPets"; // Adjust the import path as necessary
import { ToastContainer, toast } from "react-toastify"; // Only use this import

import Image from "next/image"; // Import Image component from Next.js
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { BarChart3, Bell, ShoppingCart, Users, CheckCircle, Activity, LayoutDashboard, User, Settings, ListChecks } from "lucide-react"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [taskStatus, setTaskStatus] = useState("pending");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [, setPaymentMethod] = useState("paypal");
  const [, setLanguage] = useState("en");
  const [cart, setCart] = useState<number[]>([]); // Cart state (only IDs)
  const [discountCode, setDiscountCode] = useState<string>(""); // Discount code state
  const [discountApplied, setDiscountApplied] = useState<boolean>(false); // Flag to track if discount is applied
  const [activities, setActivities] = useState<{ title: string; description: string; timestamp: string }[]>([]);
   
     useEffect(() => {
       // Get activities from localStorage on component mount
       const storedActivities = JSON.parse(localStorage.getItem("recentActivities") || "[]");
       setActivities(storedActivities);
     }, []);

     useEffect(() => {
      localStorage.removeItem("recentActivities");
    }, []);
    
    // Load cart from localStorage when the component mounts
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
  
    const menuItems = [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "profile", label: "Profile", icon: User },
      { id: "settings", label: "Settings", icon: Settings },
      { id: "cart", label: "Cart", icon: ShoppingCart },
      { id: "recent-activity", label: "Your Adoptions", icon: Activity },
      { id: "tasks", label: "Tasks", icon: ListChecks },
      { id: "analytics", label: "Analytics", icon: BarChart3 }
    ];
    


  // Function to render dashboard content
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p className="text-gray-300 mb-6">Manage your profile settings and personal details.</p>
            <div className="flex items-center gap-4">
              <img src="https://via.placeholder.com/100" alt="Profile" className="rounded-full" />
              <div>
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-gray-400">john.doe@example.com</p>
              </div>
            </div>
          </motion.div>
        );
        case "settings":
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-gray-300 mb-6">Customize your dashboard preferences and account settings.</p>
              <ul className="space-y-4">
                
                {/* Notifications Toggle */}
                <li className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                  <span>Notifications</span>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`p-2 rounded-full transition-colors ${notificationsEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
                  >
                    {notificationsEnabled ? 'On' : 'Off'}
                  </button>
                </li>
        
                {/* Dark Mode Toggle */}
                <li className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                  <span>Dark Mode</span>
                  <button
                    onClick={() => setDarkModeEnabled(!darkModeEnabled)}
                    className={`p-2 rounded-full transition-colors ${darkModeEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
                  >
                    {darkModeEnabled ? 'On' : 'Off'}
                  </button>
                </li>
        
                {/* Privacy Settings */}
                <li className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                  <span>Privacy Settings</span>
                  <button className="bg-blue-500 text-white py-1 px-3 rounded-lg">Manage</button>
                </li>
        
                {/* Language Selection */}
                <li className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                  <span>Language</span>
                  <select 
                    className="bg-gray-700 text-white py-1 px-3 rounded-lg"
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </li>
        
                {/* Two-Factor Authentication Toggle */}
                <li className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                  <span>Two-Factor Authentication</span>
                  <button
                    onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                    className={`p-2 rounded-full transition-colors ${twoFactorAuth ? 'bg-green-500' : 'bg-gray-600'}`}
                  >
                    {twoFactorAuth ? 'Enabled' : 'Disabled'}
                  </button>
                </li>
        
                {/* Payment Method Selection */}
                <li className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                  <span>Payment Method</span>
                  <select 
                    className="bg-gray-700 text-white py-1 px-3 rounded-lg"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="paypal">PayPal</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="crypto">Cryptocurrency</option>
                  </select>
                </li>
        
              </ul>
            </motion.div>
          );
          case "cart":
  return (

 <div>
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
        
  


case "recent-activity":
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl text-black text-center font-bold mb-4">Recent Activity</h2>
        <p className="text-gray-800 text-center mb-6">Check your recent activity and interactions. Everytime you Adopt a Pet!</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="space-y-4 max-w-7xl mx-auto">
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              // Parse timestamp from activity
              const now = new Date();
              const activityTime = activity.timestamp ? new Date(activity.timestamp) : now;
              
              if (isNaN(activityTime.getTime())) {
                console.error("Invalid timestamp in activity:", activity);
                return null; // Skip rendering if timestamp is invalid
              }

              const timeDiff = now.getTime() - activityTime.getTime(); // Time difference in milliseconds
              
              let formattedTime;
              if (timeDiff < 1000) {
                formattedTime = "Just now"; // If within 1 minute
              } else {
                formattedTime = activityTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                });
              }

              return (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <h3 className="font-semibold">{activity.title}</h3>
                  <p className="text-gray-400">{activity.description}</p>
                  <p className="text-gray-500 text-sm mt-2">{formattedTime}</p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400">Adopt a pet first!!</p>
          )}
        </div>
      </motion.div>
    </div>
  );

      case "tasks":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            <p className="text-gray-300 mb-6">Manage and track your tasks here.</p>
            <ul className="space-y-4">
              <li className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                <span>Task 1: Adopt a new pet</span>
                <button className={`p-2 rounded-full transition-colors ${taskStatus === "completed" ? 'bg-green-500' : 'bg-gray-600'}`} onClick={() => setTaskStatus(taskStatus === "completed" ? "pending" : "completed")}>
                  {taskStatus === "completed" ? 'Completed' : 'Pending'}
                </button>
              </li>
            </ul>
          </motion.div>
        );
      case "analytics":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <p className="text-gray-300 mb-6">Track your dashboard activity and performance.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold">Adoptions</h3>
                <p className="text-gray-400">Total Pets Adopted: 12</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-gray-400">Unread Notifications: 5</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold">Revenue</h3>
                <p className="text-gray-400">Total Revenue: $450</p>
              </div>
            </div>
          </motion.div>
        );
     case "overview":
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className="text-3xl text-black text-center font-bold mb-6">Dashboard Overview</h2>
      <p className="text-gray-800 text-center mb-8 text-lg">
        Welcome back! This is your <b>command center</b>, where you can <b>monitor performance</b>, track adoptions, and manage everything <b>effortlessly</b>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 📊 Statistics Card */}
        <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }} className="bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <BarChart3 className="text-pink-500 w-7 h-7" />
            </motion.div>
            <h3 className="text-xl font-semibold">Statistics</h3>
          </div>
          <p className="text-gray-300">
            Monitor <b>your activity</b>, adoptions, and achievements<b> all in one place</b> . 📈
          </p>
          <p className="text-sm text-green-400 mt-2">🔹 <b>+12% activity this week</b></p>
        </motion.div>

        {/* 🔔 Notifications Card */}
        <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }} className="bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Bell className="text-blue-500 w-7 h-7" />
            </motion.div>
            <h3 className="text-xl font-semibold">Notifications</h3>
          </div>
          <p className="text-gray-300">
            Stay <b>updated</b> with the latest alerts, adoption requests, and important messages. 🔔
          </p>
          <p className="text-sm text-yellow-400 mt-2">📢 <b>2 new notifications</b></p>
        </motion.div>

        {/* 🛒 Orders Card */}
        <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }} className="bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <ShoppingCart className="text-green-500 w-7 h-7" />
            </motion.div>
            <h3 className="text-xl font-semibold">Orders</h3>
          </div>
          <p className="text-gray-300">
            Review <b>your recent adoptions and pending requests</b> in real-time. 🛒
          </p>
          <p className="text-sm text-purple-400 mt-2">✔ <b>3 pending approvals</b></p>
        </motion.div>

        {/* 👥 User Engagement Card */}
        <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }} className="bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <motion.div animate={{scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }}>
              <Users className="text-orange-500 w-7 h-7" />
            </motion.div>
            <h3 className="text-xl font-semibold">User Engagement</h3>
          </div>
          <p className="text-gray-300">
            Track <b>interactions with other adopters</b> and community activities. 👥
          </p>
          <p className="text-sm text-blue-400 mt-2">✨ <b>15 new messages</b></p>
        </motion.div>

        {/* ✅ Tasks Card */}
        <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }} className="bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <CheckCircle className="text-yellow-500 w-7 h-7" />
            </motion.div>
            <h3 className="text-xl font-semibold">Tasks</h3>
          </div>
          <p className="text-gray-300">
            Stay on top of <b>your pending adoptions and important tasks</b>. ✅
          </p>
          <p className="text-sm text-red-400 mt-2">⏳ <b>2 overdue tasks</b></p>
        </motion.div>

        {/* 📊 Insights Card */}
        <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.97 }} className="bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Activity className="text-purple-500 w-7 h-7" />
            </motion.div>
            <h3 className="text-xl font-semibold">Insights</h3>
          </div>
          <p className="text-gray-300">
            Get <b>personalized recommendations and adoption trends</b> based on your activity. 🔍
          </p>
          <p className="text-sm text-green-400 mt-2">📊 <b>Your adoptions increased by 8%</b></p>
        </motion.div>
      </div>
    </motion.div>
  );
    }
  };

  return (
    <div className={`min-h-screen bg-white mt-16 text-white ${darkModeEnabled ? "dark" : ""}`}>
      {/* Fullscreen Navbar */}
      <div className={`fixed top-16 left-0 lg:w-1/4  w-full md:w-1/2 h-full bg-transparent bg-opacity-50 z-50 transition-all ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gray-800 p-6"
          initial={{ x: "-100%" }}
          animate={{ x: isMenuOpen ? 0 : "-100%" }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            <IconX />
          </button>
          <ul className="space-y-4 mt-16">
    {menuItems.map((item) => (
      <motion.li
        key={item.id}
        onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
        className={`cursor-pointer flex items-center gap-3 text-lg p-3 rounded-lg transition-all duration-300 
          ${activeTab === item.id ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <item.icon className="w-5 h-5" />
        {item.label}
      </motion.li>
    ))}
  </ul>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="">
            <IconMenu className="text-gray-800" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
