import { Link } from "react-router-dom";

export default function BlogPost({blog}) {

  function calTime(text) {
    const wordsPerMinute = 200; // Adjust as needed
    const words = text.trim().split(/\s+/).length; // Count words
    const minutes = Math.ceil(words / wordsPerMinute); // Round up
    return `${minutes} min read`;
  }


  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  return (
    <div className="bg-[#171717] text-white p-4 rounded-lg mb-4 shadow-lg">
      {/* User Info */}
      <div className="flex items-center gap-1">
      <span>😴</span>
        <div>
          <h2 className="text-sm font-semibold text-gray-300">{blog.author || "anonymous"}</h2>
          <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>
      </div>

      <div className="md:ml-10 ml-5">
        {/* Blog Title */}
        <h1 className="md:text-xl text-lg font-bold mt-4">
        { blog.title}
        </h1>

        {/* Reactions & Comments */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-gray-400 gap-2 text-sm">
          <Link to={`/blog/${blog._id}#comments-section`}><span>💬Comments</span></Link>
          </div>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <div className="flex items-center gap-1">
            
            </div>
            <span>{calTime(blog.content)}</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}
