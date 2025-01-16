import { useState } from "react";
import { motion } from "framer-motion";
import { IconShoppingCart, IconHeart, IconUser, IconSettings, IconBox, IconCreditCard } from "@tabler/icons-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <p className="text-gray-300">Your orders will appear here.</p>;
      case "wishlist":
        return <p className="text-gray-300">Your wishlist items will appear here.</p>;
      case "payments":
        return <p className="text-gray-300">Your payment history will appear here.</p>;
      default:
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-300">Welcome to your dashboard! Here you can manage your orders, wishlist, and payments.</p>
            <div className="grid grid-cols-3 gap-6 mt-6">
              <div className={`p-4 bg-gray-800 rounded-lg shadow-md text-center ${activeTab === "orders" ? "bg-gray-700" : ""}`}>
                <IconShoppingCart size={32} className="mx-auto text-blue-500" />
                <p className="mt-2 text-lg font-semibold">10 Orders</p>
              </div>
              <div className={`p-4 bg-gray-800 rounded-lg shadow-md text-center ${activeTab === "wishlist" ? "bg-gray-700" : ""}`}>
                <IconHeart size={32} className="mx-auto text-red-500" />
                <p className="mt-2 text-lg font-semibold">5 Wishlist Items</p>
              </div>
              <div className={`p-4 bg-gray-800 rounded-lg shadow-md text-center ${activeTab === "payments" ? "bg-gray-700" : ""}`}>
                <IconCreditCard size={32} className="mx-auto text-green-500" />
                <p className="mt-2 text-lg font-semibold">3 Payments Pending</p>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <nav className="flex justify-between items-center py-4 border-b border-gray-600">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
          Galactic Pet Adoption Dashboard
        </h1>
        <div className="flex space-x-4">
          <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600"><IconUser /></button>
          <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600"><IconSettings /></button>
        </div>
      </nav>

      <div className="flex flex-row mt-6 gap-6">
        <aside className="w-1/4 bg-gray-800 p-4 rounded-lg shadow-lg">
          <ul className="space-y-4">
            <li onClick={() => setActiveTab("overview")} className={`cursor-pointer flex items-center gap-2 p-3 rounded-lg transition ${activeTab === "overview" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
              <IconBox /> Overview
            </li>
            <li onClick={() => setActiveTab("orders")} className={`cursor-pointer flex items-center gap-2 p-3 rounded-lg transition ${activeTab === "orders" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
              <IconShoppingCart /> Orders
            </li>
            <li onClick={() => setActiveTab("wishlist")} className={`cursor-pointer flex items-center gap-2 p-3 rounded-lg transition ${activeTab === "wishlist" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
              <IconHeart /> Wishlist
            </li>
            <li onClick={() => setActiveTab("payments")} className={`cursor-pointer flex items-center gap-2 p-3 rounded-lg transition ${activeTab === "payments" ? "bg-gray-700" : "hover:bg-gray-700"}`}>
              <IconCreditCard /> Payments
            </li>
          </ul>
        </aside>

        <main className="flex-1 bg-gray-900 p-6 rounded-lg shadow-lg">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
