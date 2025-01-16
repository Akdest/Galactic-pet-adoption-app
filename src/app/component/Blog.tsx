"use client";
import React from 'react';

interface BlogCardProps {
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  category: string;
  date: string;
  wordCount: number;
  tags: string[];
}

const calculateReadingTime = (words: number) => `${Math.ceil(words / 200)} min read`;

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  thumbnail,
  link,
  category,
  date,
  wordCount,
  tags,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden  hover:shadow-2xl transform hover:scale-105 transition duration-300 relative">
      <img src={thumbnail} alt={title} className="w-full h-56 object-cover sm:h-64 md:h-72" />

      {/* Category Badge */}
      <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-semibold uppercase px-3 py-1 rounded-full">
        {category}
      </span>

      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-700 mt-2 text-sm sm:text-base">{description}</p>

        {/* Date and Reading Time */}
        <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
          <span>{new Date(date).toDateString()}</span>
          <span>{calculateReadingTime(wordCount)}</span>
        </div>

        <a 
          href={link} 
          className="text-pink-600 mt-4 inline-block font-medium hover:underline"
        >
          Read more
        </a>

        {/* Related Topics Section */}
        <div className="mt-4">
          <span className="block text-gray-600 text-sm font-semibold mb-2">Related Topics:</span>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
