"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { IconUser, IconSettings, IconChartBar, IconBell, IconCreditCard, IconLogout, IconMenu, IconX } from "@tabler/icons-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [taskStatus, setTaskStatus] = useState("pending");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-gray-300 mb-6">Customize your dashboard preferences and account settings.</p>
            <ul className="space-y-4">
              <li className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                <span>Notifications</span>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`p-2 rounded-full transition-colors ${notificationsEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
                >
                  {notificationsEnabled ? 'On' : 'Off'}
                </button>
              </li>
              <li className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                <span>Dark Mode</span>
                <button
                  onClick={() => setDarkModeEnabled(!darkModeEnabled)}
                  className={`p-2 rounded-full transition-colors ${darkModeEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
                >
                  {darkModeEnabled ? 'On' : 'Off'}
                </button>
              </li>
              <li className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                <span>Privacy Settings</span>
                <button className="bg-blue-500 text-white py-1 px-3 rounded-lg">Manage</button>
              </li>
            </ul>
          </motion.div>
        );
      case "recent-activity":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <p className="text-gray-300 mb-6">Check your recent activity and interactions.</p>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold">Adopted New Pet</h3>
                <p className="text-gray-400">You successfully adopted a new alien pet! 🚀</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold">Profile Updated</h3>
                <p className="text-gray-400">You updated your profile picture and personal details.</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold">Pet Returned</h3>
                <p className="text-gray-400">You returned a pet to the adoption center. 🐾</p>
              </div>
            </div>
          </motion.div>
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
      default:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-300 mb-6">Welcome to your dashboard! Here you can manage your account and view your activity.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <div className="flex items-center justify-between mb-4">
                    <IconChartBar className="text-pink-500" />
                    <h3 className="text-xl font-semibold">Statistics</h3>
                  </div>
                  <p className="text-gray-400">Track your activities and progress with detailed statistics.</p>
                </motion.div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <div className="flex items-center justify-between mb-4">
                    <IconBell className="text-blue-500" />
                    <h3 className="text-xl font-semibold">Notifications</h3>
                  </div>
                  <p className="text-gray-400">Stay up to date with the latest updates and alerts.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className={`min-h-screen bg-gray-900 mt-24 text-white ${darkModeEnabled ? "dark" : ""}`}>
      {/* Fullscreen Navbar */}
      <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 transition-all ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <motion.div
          className="absolute top-0 left-0 w-3/4 h-full bg-gray-800 p-6"
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
            <li onClick={() => { setActiveTab("overview"); setIsMenuOpen(false); }} className="cursor-pointer text-lg">Overview</li>
            <li onClick={() => { setActiveTab("profile"); setIsMenuOpen(false); }} className="cursor-pointer text-lg">Profile</li>
            <li onClick={() => { setActiveTab("settings"); setIsMenuOpen(false); }} className="cursor-pointer text-lg">Settings</li>
            <li onClick={() => { setActiveTab("recent-activity"); setIsMenuOpen(false); }} className="cursor-pointer text-lg">Recent Activity</li>
            <li onClick={() => { setActiveTab("tasks"); setIsMenuOpen(false); }} className="cursor-pointer text-lg">Tasks</li>
            <li onClick={() => { setActiveTab("analytics"); setIsMenuOpen(false); }} className="cursor-pointer text-lg">Analytics</li>
          </ul>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="">
            <IconMenu className="text-white" />
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
