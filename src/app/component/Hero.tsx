"use client";
import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
  products,
  carouselImages,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  carouselImages: string[];
}) => {
  const [gradient, setGradient] = useState<string>(
    "radial-gradient(circle at center, rgba(255, 239, 255, 1), rgba(255, 255, 255, 0.8))"
  );
  const [isBelowViewport, setIsBelowViewport] = useState(false);

  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);

  // Mouse-follow gradient effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      setGradient(
        `radial-gradient(circle at ${x}% ${y}%,rgba(255, 239, 255, 1), ${
          isBelowViewport ? "rgba(255,255,255,1)" : "rgba(255,255,255,1)"
        })`
      );
    };

    const handleScroll = () => {
      setIsBelowViewport(window.scrollY > window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isBelowViewport]);

  return (
    <div
      ref={ref}
      className="lg:h-[200vh] md:h-[240vh] relative overflow-hidden antialiased flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
      style={{
        background: gradient,
        transition: "background 0.2s ease-in-out",
        backgroundColor: isBelowViewport ? "white" : "black",
      }}
    >
      {/* Full-Screen Black Overlay */}
      <div className={`absolute inset-0 z-[1] pointer-events-none ${isBelowViewport ? "opacity-0" : "opacity-60"}`}></div>

      {/* Carousel Section */}
      <Carousel images={carouselImages} />

      {/* Header Content */}
      <Header />

      {/* Product Rows */}
      <motion.div style={{ rotateZ, opacity }} className="space-y-16 lg:mt-24 md:mt-8 mt-6  relative z-10">
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        
      </motion.div>
    </div>
  );
};

// Carousel Component
const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 h-[100vh] w-full z-[-1] overflow-hidden">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === index ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={image}
            alt={`Carousel Image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-1000"
          />
        </motion.div>
      ))}
    </div>
  );
};
const words = [
  "Best Friend",
  "Furry Buddy",
  "Companion",
  "Alien Pet",
  "Loyal Friend",
  "Adventurer"
];

// Header Component
const Header = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Changes every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl relative mx-auto py-20 mt-40 md:mt-40 lg:mt-40 px-4 w-full text-center">
      <h1 className="text-2xl md:text-6xl font-bold text-white relative z-10">
        Your New{" "}
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text"
        >
          {words[index]}
        </motion.span>{" "}
        is Waiting!
      </h1>
      <p className="text-md  md:text-xl mt-8 text-white relative z-10">
        Adopt Love, Adopt Joy, Adopt a Pet Today!
      </p>
      <div className="flex justify-center mt-12 relative z-10">
        <button
          onClick={() => (window.location.href = "/pages/AdoptionList")}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-pink-700 hover:scale-105 transition-all duration-300"
        >
          Adopt Now
        </button>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({
  product,
  translate,
}: {
  product: { title: string; link: string; thumbnail: string };
  translate: MotionValue<number>;
}) => (
  <motion.div
    style={{ x: translate }}
    whileHover={{ y: -20 }}
    className="group/product h-96 w-[30rem] relative flex-shrink-0"
  >
    <Link href={product.link} className="block group-hover/product:shadow-2xl">
      <Image
        src={product.thumbnail}
        height={600}
        width={600}
        className="object-cover object-left-top absolute h-full w-full inset-0"
        alt={product.title}
      />
    </Link>
    <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black/50 pointer-events-none"></div>
    <h2 className="absolute bottom-16 left-4 opacity-0 group-hover/product:opacity-100 text-white">
      {product.title}
    </h2>
    
  </motion.div>
);
