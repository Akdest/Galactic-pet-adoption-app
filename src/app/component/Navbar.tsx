"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Disclosure, Transition } from "@headlessui/react";
import { motion } from "framer-motion";

// Navigation links for Pet Adoption Web App
const NAVLINKS = [
    { href: "/Home", text: "HOME" },
    { href: "/About", text: "ABOUT US" },
    {
      href: "/pages/Login",
      text: "LOGIN",
      

    },
    {
      href: "",
      text: "SERVICES",
      subMenu: [
        { href: "/PetCare", text: "PET CARE TIPS" },
        { href: "/Training", text: "PET TRAINING" },
        { href: "/PetHealth", text: "HEALTH CHECKUP PLANS" },
      ],
    },
    { href: "/Cart", text: "ADOPTION CART" },
    {
      href: "",
      text: "COMMUNITY",
      subMenu: [
        { href: "/Forums", text: "DISCUSSION FORUMS" },
        { href: "/Events", text: "UPCOMING EVENTS" },
        { href: "/Volunteer", text: "VOLUNTEER WITH US" },
      ],
    },
    { href: "/ContactUs", text: "CONTACT US" },
];

// Image collections for each menu hover
const IMAGE_GRID: Record<string, string[]> = {
    default: [
        "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1574169208507-84376164818c?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1578271720355-8aa1e92af995?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=800&q=60"
    ],
    1: [
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1516728778615-d7bad6c5454e?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1592192862202-2119f3ea29cf?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1559027615-5b207fb32728?auto=format&fit=crop&w=800&q=60"
    ],
    2: [
        "https://images.unsplash.com/photo-1598136497861-68ba02ddfb8b?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1556228578-162d8988da8e?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1592192862202-2119f3ea29cf?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1601758123927-0c4fef245d4b?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=800&q=60"
    ],
    3: [
        "https://images.unsplash.com/photo-1598136497861-68ba02ddfb8b?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1556228578-162d8988da8e?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1592192862202-2119f3ea29cf?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1601758123927-0c4fef245d4b?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1507149833265-60c372daea22?auto=format&fit=crop&w=800&q=60"
    ],
};

export default function Navbar() {
    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
    const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
    const [gridImages, setGridImages] = useState<string[]>(IMAGE_GRID.default);

    const handleMenuClick = (index: number) => {
        setOpenSubMenu(openSubMenu === index ? null : index);
    };

    const shuffleImages = () => {
        setGridImages((prevImages) => [...prevImages].sort(() => Math.random() - 0.5));
    };

    useEffect(() => {
        if (hoveredMenu !== null) {
            shuffleImages();
        }
    }, [hoveredMenu]);

    return (
        <Disclosure as="nav" className="fixed top-0 left-0 right-0 z-50">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <Logo />
                            </div>

                            <div className="flex-1"></div>

                            {/* Mobile Menu Button */}
                            <Disclosure.Button className="text-black focus:outline-none z-50">
                                {open ? (
                                    <X className="h-8 w-8 text-white cursor-pointer" />
                                ) : (
                                    <Menu className="h-8 w-8 cursor-pointer" />
                                )}
                            </Disclosure.Button>
                        </div>
                    </div>

                    <Transition
                        show={open}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Disclosure.Panel className="fixed inset-0 bg-black bg-opacity-85 z-40 flex flex-col">
                            {/* First Column - Main Menu */}
                            <div className="h-full flex">
                                <div className="w-1/4 p-8 overflow-y-auto mt-16 border-r-2 border-white">
                                    {NAVLINKS.map(({ href, text, subMenu }, index) => (
                                        <div key={href} className="mb-6">
                                            <Link
                                                href={href}
                                                className="block text-white lg:text-lg font-bold hover:text-blue-400"
                                                onMouseEnter={() => setHoveredMenu(index)}
                                                onClick={() => handleMenuClick(index)}
                                            >
                                                {text}
                                                {subMenu && (
                                                    <ChevronRight
                                                        className={`inline-block h-6 w-6 ${
                                                            openSubMenu === index ? "rotate-90" : ""
                                                        } transition-transform duration-200`}
                                                    />
                                                )}
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                {/* Second Column - Submenu */}
                                <div className="w-1/4 p-8 mt-16">
                                    {openSubMenu !== null &&
                                        NAVLINKS[openSubMenu].subMenu &&
                                        NAVLINKS[openSubMenu].subMenu.map(({ href, text }) => (
                                            <Link key={href} href={href} className="block text-white text-lg">
                                                {text}
                                            </Link>
                                        ))}
                                </div>

                                {/* Third Column - Animated Photo Grid */}
                                <div className="w-1/2 p-8 bg-cover relative">
                                    <motion.div
                                        className="grid grid-cols-6 gap-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {(gridImages || []).map((src, idx) => (
                                            <motion.img
                                                key={`${src}-${idx}`} // Unique key using image src and index
                                                src={src}
                                                alt={`Image ${idx}`}
                                                className="w-full h-32 object-cover rounded-lg shadow-md" // Increased height for proper grid fitting
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
}

export function Logo() {
    return (
        <div className="flex items-center space-x-2 text-white">
            <Link href="/Home">
                <img src="/logo.png" alt="Galactic Pet Adoption Agency Logo" className="w-15 h-12" />
            </Link>
        </div>
    );
}
