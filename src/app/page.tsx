import React from 'react';
import Navbar from './component/Navbar';
import { HeroParallax } from './component/Hero';  // Import HeroParallax component
import CategoryPets from './component/CategroyPet';
import HowWeWork from './component/HowWeWork';
import NewestArrivals from './component/NewArrivals';
import { AnimatedTestimonials } from './component/Testimonials';
import BlogList from './component/BlogList';
import Footer from './component/Footer';

const Page = () => {
  const products = [
    {
      title: "Cosmo Paws 🪐",
      link: "#",
      thumbnail: "/sixteen.jpg",
      carouselImage: "/htwo.jpg",
    },
    {
      title: "Nebula Whiskers 🌌",
      link: "#",
      thumbnail: "/fifteen.jpg",
      carouselImage: "/hthree.jpg",
    },
    {
      title: "Lunar Tail 🌙",
      link: "#",
      thumbnail: "/fourteen.jpg",
      carouselImage: "/hfour.jpg",
    },
    {
      title: "Astro Pup 🚀",
      link: "#",
      thumbnail: "/thirteen.jpg",
      carouselImage: "/hfive.jpg",
    },
    {
      title: "Starlight Hopper ✨",
      link: "#",
      thumbnail: "/twelwe.jpg",
      carouselImage: "/hsix.jpg",
    },
    {
      title: "Galactic Meow 🛸",
      link: "#",
      thumbnail: "/eleven.jpg",
      carouselImage: "/hseven.jpg",
    },
    {
      title: "Quantum Fluff ⚛️",
      link: "#",
      thumbnail: "/ten.jpg",
      carouselImage: "/height.jpg",
    },
    {
      title: "Eclipse Howler 🌒",
      link: "#",
      thumbnail: "/nine.jpg",
      carouselImage: "/hnine.jpg",
    },
    {
      title: "Starborn Purr 🔮",
      link: "#",
      thumbnail: "/eight.jpg",
      carouselImage: "/hten.jpg",
    },
    {
      title: "Meteor Sprinter ☄️",
      link: "#",
      thumbnail: "/seven.jpg",
      carouselImage: "/heleven.jpg",
    },
  ];
  

  const testimonials = [
    {
      quote: "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/testimone.jpg",
    },
    {
      quote: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/testimtwo.jpg",
    },
    {
      quote: "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "/testimthree.jpg",
    },
    {
      quote: "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "/testimfour.jpg",
    },
    {
      quote: "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "/testimfive.jpg",
    },
  ];

  return (
    <div>
      <Navbar />
      <HeroParallax products={products} carouselImages={products.map(product => product.carouselImage)} />  
      <CategoryPets />
      <NewestArrivals/>
      <HowWeWork />
      <AnimatedTestimonials testimonials={testimonials} />
            <BlogList />
          
<Footer/>
    </div>
  );
};

export default Page;
