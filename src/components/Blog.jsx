import React, { useEffect, useState } from "react";
import Blogfeatures from "../backend/blogConfig";
import CommentFeatures from "../backend/comment";
import { Link, useParams } from "react-router-dom";
import Load from "./Load";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Blog(){
  const {id } = useParams();
  const [err,setErr] = useState(null);
  const [blog,setBlog] = useState({});
  const [load,setLoad] = useState(true);
  const [load1,setLoad1] = useState(false);
  const [load2,setLoad2] = useState(false);
  const [del,setDel] = useState(false);
  const [comments,setComments] = useState([]);
  const [content,setContent] = useState("");
  const user = useSelector(state=>state.auth.userData);
  const navigate = useNavigate();

  const handleDelete = (commentId) => {
    setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
  };

  const fetchBlog = async () => {
    try {
      const res = await Blogfeatures.getBlog(id);
      console.log("Fetched blog data:", res);
      if (res.error) setErr(res.error);
      else{
        setBlog(res);
      } 
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoad(false);
    }
  };

  const fetchComments = async()=>{
    try {
      setLoad1(true);
      const res = await CommentFeatures.getComments(id);
      console.log("Fetched comments:", res);
      if (res.error) setErr(res.error);
      else{
        setComments(res);
      } 
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoad1(false);
    }
  }

  const addComment = async () => {
    try {
        setLoad2(true);
        
        const res = await CommentFeatures.createComment(id, {content,author:user?.username});
        console.log("user",user)
        if (!res || res.error) {
          console.log(res?.error || "Failed to add comment");
            setErr(res?.error || "Failed to add comment");
            return;
        }

        console.log("Added comment:", res);
        setComments(prev => [res, ...prev]); // Ensures re-render
    } catch (err) {
        setErr(err.message);
    } finally {
        setLoad2(false);
        setContent("");
    }
};

  const delBlog = async()=>{
    const res = await Blogfeatures.deleteBlog(id);
    if (res.error) console.log("error deleting" , res.error);
    else{
    navigate('/');
    } 
  }

    
  const abc = async()=>{
    await fetchBlog();
    await fetchComments();
  }

  useEffect(() => {
    abc();
  }, []);

  useEffect(() => {
    console.log("Blog userID:", blog?.userId);
    console.log("User:", user);
    if (blog?.userId && user?._id) {
        console.log("Setting delete button visibility");
        setDel(blog.userId === user._id);
    }
  }, [blog]);
  
  if(load) return(
      <Load/>
  )

  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

  return(
      <div className=" mt-10 text-white ml-3 md:ml-20">
          

          <div className="md:w-[80vw] w-[90vw] rounded-lg text-white bg-[#171717] pb-10 ">
              <img src={blog?.imageurl} alt="image" className="w-full h-auto mx-auto" />
              <h1 className="text-2xl mt-10 ml-2 md:ml-10">😴{blog.author}</h1>
              <h2 className="text-sm pl-10 md:pl-18">posted on {formattedDate}</h2>
              <h1 className="md:text-4xl text-2xl text-center mt-15  px-5 md:px-10 ">{blog?.title}</h1>
              <p className=" pt-10 md:text-xl break-words text-lg text-left px-2 md:px-10">{blog?.content}</p>
              {/* {err ? <p className="text-xl text-red-500 bg-white p-3">{err}</p> : null} */}
              <div className=" border-t-white border-1 my-4"></div>
              <div className="px-3 md:px-15">
                  <h1 className="md:text-2xl text-lg">Top Comments ({comments.length})</h1>
              </div>
              <div id="comments-section" className="md:px-15 px-5 pt-4 mt-4 bg-[#171717] rounded-md ">
                  <textarea
                      className="w-full mt-3 text-md md:text-lg bg-black md:p-5 p-3 border-white border-1  h-[100px] text-white rounded-md  focus:outline-none resize-none overflow-hidden"
                      placeholder="Write your post content here..."
                      value={content}
                      onChange={(e)=>{setContent(e.target.value)}}
                  ></textarea>
                  <button className="md:p-2 p-1 bg-blue-500 mt-2 rounded-md" onClick={addComment}>Submit</button>
                  {load2 ? <p>Adding comment...</p> : null}
              </div>
              {load1 ? <p>Loading comments...</p> : null}
              {comments.map((com)=><Comment blogId={blog._id} body={com} onDelete={handleDelete} />)}
          </div>
          <div>
              {del ? (
                  <>
                    <button className="text-white p-2 rounded-md mr-2 bg-red-500 " onClick={delBlog}>Delete</button>
                    <Link to={`/blog/${id}/edit`}><button className="text-white py-2 px-4 rounded-md mr-2 bg-green-500 " >Edit</button></Link>
                  </>
              ) : null}
          </div>
      </div>
  )
}