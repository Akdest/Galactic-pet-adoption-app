import Link from "next/link";
import React from "react";
import BlogCard from "./Blog";
import { blogs } from "../data/blogs"; // Import blog data

const BlogList = () => {
  return (
    <div className="mx-auto py-10 bg-white px-4 md:px-8">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
        Discover Galactic Pet Tips 🐾
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} link={`${blog.id}`} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
