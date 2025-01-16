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
      title: "Product 1",
      link: "#",
      thumbnail: "/one.jpg", // Updated to a sample image path
    },
    {
      title: "Product 2",
      link: "#",
      thumbnail: "/one.jpg", // Updated to a sample image path
    },
    {
      title: "Product 3",
      link: "#",
      thumbnail: "/one.jpg", // Updated to a sample image path
    },
    {
      title: "Product 4",
      link: "#",
      thumbnail: "/one.jpg", // Updated to a sample image path
    },
    {
      title: "Product 5",
      link: "#",
      thumbnail: "/one.jpg", // Updated to a sample image path
    },
    {
      title: "Product 6",
      link: "#",
      thumbnail: "/one.jpg", // Updated to a sample image path
    },
    {
      title: "Product 7",
      link: "#",
      thumbnail: "/one.jpg", // Updated to a sample image path
    },
    {
      title: "Product 8",
      link: "#",
      thumbnail: "/one.jpg", // Updated to a sample image path
    },
    {
      title: "Product 9",
      link: "#",
      thumbnail: "/one.jpg", // Updated to a sample image path
    },
    {
      title: "Product 10",
      link: "#",
      thumbnail: "/one.jpg", // Updated to a sample image path
    },
  ];

  const testimonials = [
    {
      quote: "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/one.jpg",
    },
    {
      quote: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/one.jpg",
    },
    {
      quote: "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "/one.jpg",
    },
    {
      quote: "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "/one.jpg",
    },
    {
      quote: "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "/one.jpg",
    },
  ];

  return (
    <div>
      <Navbar />
      <HeroParallax products={products} carouselImages={products.map(product => product.thumbnail)} />  
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
