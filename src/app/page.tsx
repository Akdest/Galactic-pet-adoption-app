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
  


  return (
    <div>
      <Navbar />
      <HeroParallax products={products} carouselImages={products.map(product => product.carouselImage)} />  
      <CategoryPets />
      <NewestArrivals/>
      <HowWeWork />
      <AnimatedTestimonials />
            <BlogList />
          
<Footer/>
    </div>
  );
};

export default Page;
