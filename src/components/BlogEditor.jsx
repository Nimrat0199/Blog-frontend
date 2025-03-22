import { useState } from "react";
import Blogfeatures from "../backend/blogConfig"
import { useDispatch } from "react-redux";
import { addBlog } from "../store/blogSlice";
import { useNavigate } from "react-router-dom";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [content , setContent] = useState("");
  const [file,setFile] = useState(null);
  const [err,setErr] = useState(null);
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const [load,setLoad ] = useState(false);

  const create = ()=>{
    setLoad(true);
    setErr(null);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("file", file);
    console.log(formData);
    Blogfeatures.createBlog(formData)
    .then(res=>{
      if(res.error){
        setLoad(false);
        setErr(res.error);
      } 
      else{
        setLoad(false);
        dispatch(addBlog(res));
        navigate(`/blog/${res._id}`);
      }
    })
  }

  return (
    <div className="p-6 w-full mt-10 text-white ">
      <div className="md:ml-30  w-full md:w-[50%] h-[85vh] ">
            {/* Post Title */}
        <div className="bg-[#171717] md:px-15 px-5 py-10 ">
            <label className="p-2 border-2 rounded-md border-[#3b3b3b] cursor-pointer inline-block">
            {file?.name || "Add a Cover Image"}
              <input type="file" className="hidden" onChange={(e)=>{setFile(e.target.files[0])}} />
            </label>
            
            <textarea
            className="w-full mt-3 text-3xl md:text-5xl  font-bold min-h-[40px] text-white rounded-md  focus:outline-none resize-none overflow-hidden"
            placeholder="New post title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            {/* <input
          type="text"
          placeholder="Add up to 4 tags..."
          className="w-full   text-lg text-white rounded-md focus:outline-none"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        /> */}
        </div>

          <div className="md:px-15 px-5 pt-4 mt-4 bg-[#171717] rounded-md ">
          <textarea
            className="w-full mt-3 text-lg   h-[300px] text-white rounded-md  focus:outline-none resize-none overflow-hidden"
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

        {/* Action Buttons */}
        <div className="flex justify-between text-white mt-4">
          <button className="bg-purple-600 px-4 py-2 rounded-md" onClick={create}>Publish</button>
          {err ? <p>{err}</p> : null}
          {load ? <p>Loading...</p> : null}
          <button className="bg-gray-600 px-4 py-2 rounded-md">Save Draft</button>
        </div>
      </div>
    </div>
  );
}
