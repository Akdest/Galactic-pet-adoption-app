"use client";
import { useState, useEffect } from "react";
import { FaThumbsUp, FaBookmark, FaComment, FaArrowLeft, FaCalendarAlt, FaTags } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { blogs } from "../../../data/blogs";
import { IconShare, IconBrandWhatsapp, IconBrandTwitter, IconBrandLinkedin, IconBrandFacebook } from "@tabler/icons-react";
import NavbarOther from "@/app/component/NavbarOther";
import Footer from "@/app/component/Footer";

const Page = () => {
  const { link } = useParams();
  const router = useRouter();
  const blog = blogs.find((b) => b.id === parseInt(link as string));

  const [scrollProgress, setScrollProgress] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { name: "John Doe", message: "Great blog! Very informative." },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((scrollY / totalHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!blog) return <p className="text-center text-red-500 text-xl font-bold">Blog not found!</p>;

  const shareBlog = (platform: string) => {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(blog.title || "Check this out!");

    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${shareText}%20${shareUrl}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      default:
        break;
    }

    window.open(url, "_blank");
  };

  const handleLike = () => setLiked(!liked);
  const handleBookmark = () => setBookmarked(!bookmarked);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setComments([...comments, { name: "Anonymous", message: comment }]);
    setComment("");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <NavbarOther />

      

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full mt-16 flex justify-center items-center px-6"
      >
        
        <div className="w-full bg-white shadow-2xl rounded-lg p-6 md:p-10 relative">
          {/* Scroll Progress Bar */}
      <div className="fixed top-16 left-0 h-1 z-100 bg-pink-600" style={{ width: `${scrollProgress}%` }}></div>
          <button
            onClick={() => router.back()}
            className="absolute top-5 right-5 bg-gray-200 hover:bg-red-600 hover:text-white text-gray-700 p-2 rounded-full transition-all shadow-md"
          >
            <FaArrowLeft />
          </button>

          {/* Floating Share Button */}
          <div className="absolute bottom-5 right-5">
            <button onClick={() => setShareOpen(!shareOpen)} className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition">
              <IconShare size={24} className="text-gray-400" />
            </button>

            <div
              className={`mb-2 flex flex-col bg-white shadow-md p-2 rounded-lg transition-opacity ${shareOpen ? "opacity-100 " : "opacity-0 hidden"}`}
            >
              <button onClick={() => shareBlog("whatsapp")} className="flex items-center gap-2 px-3 py-1 text-green-500 hover:bg-gray-100 rounded">
                <IconBrandWhatsapp size={20} /> WhatsApp
              </button>
              <button onClick={() => shareBlog("twitter")} className="flex items-center gap-2 px-3 py-1 text-blue-500 hover:bg-gray-100 rounded">
                <IconBrandTwitter size={20} /> Twitter
              </button>
              <button onClick={() => shareBlog("linkedin")} className="flex items-center gap-2 px-3 py-1 text-blue-700 hover:bg-gray-100 rounded">
                <IconBrandLinkedin size={20} /> LinkedIn
              </button>
              <button onClick={() => shareBlog("facebook")} className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:bg-gray-100 rounded">
                <IconBrandFacebook size={20} /> Facebook
              </button>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900">{blog.title}</h1>

          {/* Date & Author */}
          <div className="flex items-center justify-between text-gray-500 text-sm mt-3">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <span>{new Date(blog.date).toDateString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <Image src={blog.author.avatar} alt={blog.author.name} width={35} height={35} className="rounded-full" />
              <span className="font-medium">{blog.author.name}</span>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="relative w-full h-[100vh] mt-6 rounded-md overflow-hidden shadow-lg">
            <Image src={blog.thumbnail} alt={blog.title} layout="fill" objectFit="cover" />
          </motion.div>

          <blockquote className="italic border-l-4 border-pink-600 text-gray-800 pl-4 mt-6">{blog.story}</blockquote>

          <p className="text-gray-700 mt-6 leading-relaxed text-lg">{blog.content}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {blog.tags.map((tag, index) => (
              <span key={index} className="bg-pink-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <FaTags className="text-white" />
                {tag}
              </span>
            ))}
          </div>

          {/* Like and Bookmark Buttons */}
          <div className="flex gap-4 mt-6">
            <button onClick={handleLike} className={`flex items-center gap-2 text-lg ${liked ? "text-pink-600" : "text-gray-500"}`}>
              <FaThumbsUp /> Like
            </button>
            <button onClick={handleBookmark} className={`flex items-center gap-2 text-lg ${bookmarked ? "text-yellow-600" : "text-gray-500"}`}>
              <FaBookmark /> Bookmark
            </button>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="text-2xl flex gap-x-4 font-semibold text-gray-900"><FaComment/>Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full p-4 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600"
                placeholder="Leave a comment..."
              />
              <button type="submit" className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
                Post Comment
              </button>
            </form>

            {/* Display Comments */}
            <div className="mt-6">
              {comments.map((comment, index) => (
                <div key={index} className="mt-4 p-4 border-t text-black border-gray-200">
                  <strong>{comment.name}</strong>
                  <p className="mt-2 text-black">{comment.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Page;
