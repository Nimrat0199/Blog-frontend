import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import CommentFeatures from "../backend/comment";
import { useNavigate } from "react-router-dom";

export default function Comment({blogId,body,onDelete}) {
  const [del,setDel ] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(state=>state.auth.userData);
  const date = new Date(body.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

  const delComment = async()=>{
    const res = await CommentFeatures.deleteComment(blogId,body._id);
    if (res.error) console.log("error deleting :" , res.error);
    else{
      console.log("deleting comment :",res);
      onDelete(body._id);
    } 
  }

  useEffect(() => {
      if (body?.userId && user?._id) {
          setDel(body.userId === user._id);
      }
  }, []);


    return (
      <div className="bg-[#171717] text-white md:px-8 px-4 rounded-lg my-5 shadow-lg">
        {/* User Info */}
        <div className="flex items-center justify-between ">
            <div className="flex">
            <span>😴</span>
            <h2 className="text-sm font-bold">{body.author || "anonymous"} .</h2>
            <p className="text-xs font-semibold pt-1 text-gray-400">{formattedDate}</p>
            </div>
            <div>
              {del ? <button className="px-2 rounded-md bg-red-400" onClick={delComment}>Delete</button>: null}
            </div>
          </div>
  
        <div className="md:ml-10 ml-5">
          {/* Blog Title */}
          <h1 className="md:text-xl text-lg  mt-1">
          { body.content}
          </h1>
        </div>
        <div className="flex justify-between ml-10 items-center mt-4">
          <div className="flex items-center gap-2 text-lg">
            {/* <span>&#10084; Likes</span> */}
          </div>
          
        </div>
      </div>
    );
  }
  