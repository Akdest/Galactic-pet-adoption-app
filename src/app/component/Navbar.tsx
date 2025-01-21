"use client";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, User, ShoppingCart } from "lucide-react"; 
import Link from "next/link";
import { Disclosure, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import IMAGE_DETAILS from "./ImageDetails"; // Import the image details
import { FaHome } from "react-icons/fa";

const NAVLINKS = [
  { href: "/", text: "HOME" },
  { href: "#", text: "ABOUT US" },
  { href: "/pages/Login", text: "LOGIN" },
  { href: "/pages/AdoptionList", text: "ADOPTION LIST" },
  {
    href: "",
    text: "SERVICES",
    subMenu: [
      { href: "#", text: "PET CARE TIPS" },
      { href: "#", text: "PET TRAINING" },
      { href: "#", text: "HEALTH CHECKUP PLANS" },
    ],
  },
  { href: "/pages/Cart", text: "ADOPTION CART" },
  {
    href: "",
    text: "COMMUNITY",
    subMenu: [
      { href: "#", text: "DISCUSSION FORUMS" },
      { href: "#", text: "UPCOMING EVENTS" },
      { href: "#", text: "VOLUNTEER WITH US" },
    ],
  },
  { href: "#", text: "CONTACT US" },
];

export default function Navbar() {
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuClick = (index: number) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  // Scroll event listener for changing navbar background color
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shuffle images when hovering over menu
  const [shuffledImages, setShuffledImages] = useState(IMAGE_DETAILS);

  const shuffleImages = () => {
    setShuffledImages([...IMAGE_DETAILS].sort(() => Math.random() - 0.5));
  };

  return (
    <Disclosure as="nav" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Logo />
              </div>

              <div className="flex-1"></div>

              {/* Profile & Cart Icons */}
              <div className="flex items-center space-x-4">
                {/* Profile Button */}
                <Link href="/pages/Login">
                  <User className="text-black h-6 w-6 cursor-pointer" />
                </Link>

                {/* Cart Button */}
                <Link href="/pages/Cart">
                  <ShoppingCart className="text-black h-6 w-6 cursor-pointer" />
                </Link>

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
              <div className="h-full flex flex-col sm:flex-row">
                {/* First Column - Main Menu */}
                <div className="w-full sm:w-1/4 p-8 overflow-y-auto mt-16 border-r-2 border-white">
                  {NAVLINKS.map(({ href, text, subMenu }, index) => (
                    <div key={href} className="mb-6">
                      <Link
                        href={href}
                        className="block text-white lg:text-lg font-bold hover:text-blue-400"
                        onClick={() => handleMenuClick(index)}
                      >
                        {text}
                        {subMenu && (
                          <ChevronRight
                            className={`inline-block h-6 w-6 ${openSubMenu === index ? "rotate-90" : ""} transition-transform duration-200`}
                          />
                        )}
                      </Link>
                      {/* Submenu visible only for sm devices */}
                      {openSubMenu === index && subMenu && (
                        <div className="mt-4 sm:block hidden md:hidden lg:hidden">
                          {subMenu.map(({ href, text }) => (
                            <Link key={href} href={href} className="block text-white text-lg">
                              {text}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Second Column - Submenu (hidden for sm devices only) */}
                <div className="w-full sm:w-1/4 p-8 mt-16 sm:hidden md:block lg:block">
                  {openSubMenu !== null &&
                    NAVLINKS[openSubMenu].subMenu &&
                    NAVLINKS[openSubMenu].subMenu.map(({ href, text }) => (
                      <Link key={href} href={href} className="block text-white text-lg">
                        {text}
                      </Link>
                    ))}
                </div>

                {/* Third Column - Animated Photo Grid (hidden for sm and md devices) */}
                <div className="w-full sm:w-1/2 md:hidden p-8 bg-cover relative hidden lg:flex items-center justify-center">
                  <motion.div
                    className="grid grid-rows-4 grid-cols-4 gap-1 mx-auto my-auto justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    onMouseEnter={shuffleImages} // Shuffle images when hovering over menu
                  >
                    {shuffledImages.map((image, idx) => (
                     <motion.div
                     key={`${image.src}-${idx}`}
                     whileHover={{ scale: 1.05 }}
                     transition={{ duration: 0.3 }}
                   >
                     <Image
                       src={image.src}
                       alt={image.alt}
                       width={500} // Adjust width as needed
                       height={128} // Adjust height as needed (corresponding to h-32)
                       className="w-full h-32 object-cover rounded-lg shadow-md"
                     />
                   </motion.div>
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
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex items-center space-x-2 text-white">
      <Link href="/">
      {/* <Image
  src="/logo.png"
  alt="Galactic Pet Adoption Agency Logo"
  width={60} // Adjust width as needed (equivalent to w-15)
  height={48} // Adjust height as needed (equivalent to h-12)
  className="w-15 h-12"
/> */}

<FaHome className={`h-6 w-8 transition-all duration-300 ${isScrolled ? 'text-black' : 'text-white'}`} />
      </Link>
    </div>
  );
}
