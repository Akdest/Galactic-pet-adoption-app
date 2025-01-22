"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IconHeart, IconBookmark, IconShare, IconBrandWhatsapp, IconBrandTwitter, IconBrandLinkedin, IconBrandFacebook } from "@tabler/icons-react";
import Link from "next/link"; // Import Link

interface BlogCardProps {
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  category: string;
  date: string;
  wordCount: number;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
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
  author,
}) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const shareBlog = (platform: string) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(link);

    let shareLink = "";
    switch (platform) {
      case "whatsapp":
        shareLink = `https://api.whatsapp.com/send?text=${encodedTitle} - ${encodedUrl}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      default:
        return;
    }
    window.open(shareLink, "_blank");
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300 group">
      <div className="relative">
        <Image
          src={thumbnail}
          alt={title}
          width={500}
          height={256}
          className="w-full h-56 object-cover sm:h-64 md:h-72"
        />
        <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-semibold uppercase px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* Interactive Buttons */}
      <div className="absolute top-3 right-3 flex gap-2">
        <button onClick={() => setLiked(!liked)} className="p-1 bg-white rounded-full shadow-md hover:scale-110 transition">
          <IconHeart size={20} className={liked ? "text-red-500" : "text-gray-400"} />
        </button>
        <button onClick={() => setBookmarked(!bookmarked)} className="p-1 bg-white rounded-full shadow-md hover:scale-110 transition">
          <IconBookmark size={20} className={bookmarked ? "text-yellow-500" : "text-gray-400"} />
        </button>
        
        {/* Share Button */}
        <div className="relative">
          <button
            onClick={() => setShareOpen(!shareOpen)}
            className="p-1 bg-white rounded-full shadow-md hover:scale-110 transition"
          >
            <IconShare size={20} className="text-gray-400" />
          </button>

          {/* Social Share Icons */}
          {shareOpen && (
            <div className="absolute top-full right-0 mt-2 flex flex-col gap-2 bg-white shadow-md p-2 rounded-lg transition-all transform origin-top scale-100">
              <button
                onClick={() => shareBlog("whatsapp")}
                className="flex items-center gap-2 px-3 py-1 text-green-500 hover:bg-gray-100 rounded"
              >
                <IconBrandWhatsapp size={20} /> WhatsApp
              </button>
              <button
                onClick={() => shareBlog("twitter")}
                className="flex items-center gap-2 px-3 py-1 text-blue-500 hover:bg-gray-100 rounded"
              >
                <IconBrandTwitter size={20} /> Twitter
              </button>
              <button
                onClick={() => shareBlog("linkedin")}
                className="flex items-center gap-2 px-3 py-1 text-blue-700 hover:bg-gray-100 rounded"
              >
                <IconBrandLinkedin size={20} /> LinkedIn
              </button>
              <button
                onClick={() => shareBlog("facebook")}
                className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:bg-gray-100 rounded"
              >
                <IconBrandFacebook size={20} /> Facebook
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-700 mt-2 text-sm sm:text-base">{description}</p>

        {/* Author Section */}
        <div className="flex items-center mt-4 gap-3">
          <Image src={author.avatar} alt={author.name} width={40} height={40} className="rounded-full" />
          <span className="text-gray-800 font-medium text-sm">{author.name}</span>
        </div>

        {/* Date and Reading Time */}
        <div className="flex items-center justify-between text-gray-500 text-sm mt-4 relative">
          <span>{new Date(date).toDateString()}</span>
          <span className="relative group cursor-pointer">
            {calculateReadingTime(wordCount)}
            <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded py-1 px-2 transition duration-300">
              {wordCount} words
            </span>
          </span>
        </div>

        {/* Updated Link Component */}
        <Link href={`../pages/Blog/${link}`} className="text-pink-600 mt-4 inline-block font-medium hover:underline">
  Read Blog
</Link>


        {/* Related Topics Section */}
        <div className="mt-4">
          <span className="block text-gray-600 text-sm font-semibold mb-2">Related Topics:</span>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full hover:bg-pink-600 hover:text-white transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Progress Bar on Hover */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-pink-500 transition-all duration-500 group-hover:w-full"></div>
    </div>
  );
};

export default BlogCard;
