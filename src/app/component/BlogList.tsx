"use client";
import React from "react";
import BlogCard from "./Blog";

const BlogList = () => {
  const blogs = [
    {
      title: "Adopting a Galactic Pet: A Complete Guide",
      description: "Explore the wonders of adopting and raising alien pets.",
      thumbnail: "/blogone.jpg",
      link: "/",
      category: "Pet Adoption",
      date: "2025-01-14",
      wordCount: 500,
      tags: ["alien pets", "pet care", "galactic life"],
      author: {
        name: "Luna Stellar",
        avatar: "/hseven.jpg",
      },
    },
    {
      title: "Caring for Space Creatures",
      description: "Tips and tricks for raising space pets.",
      thumbnail: "/blogtwo.jpg",
      link: "/",
      category: "Pet Care",
      date: "2025-01-12",
      wordCount: 400,
      tags: ["space pets", "care guide", "alien care"],
      author: {
        name: "Orion Skye",
        avatar: "/htwelwe.jpg",
      },
    },
    {
      title: "The Science Behind Galactic Pet Communication",
      description: "Understanding how alien pets interact with humans.",
      thumbnail: "/blogthree.jpg",
      link: "/",
      category: "Pet Behavior",
      date: "2025-01-10",
      wordCount: 600,
      tags: ["alien pets", "communication", "pet psychology"],
      author: {
        name: "Nova Ray",
        avatar: "/hfour.jpg",
      },
    },
  ];

  return (
    <div className="mx-auto py-10 bg-white px-4 md:px-8">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
        Discover Galactic Pet Tips 🐾
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {blogs.map((blog, index) => (
          <div key={index}>
            <BlogCard {...blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
