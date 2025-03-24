import { useState,useEffect } from "react";
import Blogfeatures from "../backend/blogConfig"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Load from "./Load";
import { Link, useParams } from "react-router-dom";

export default function EditBlog() {
  const {id } = useParams();
  const [title, setTitle] = useState("");
  const [content , setContent] = useState("");
  const [file,setFile] = useState(null);
  const [blog,setBlog] = useState({});
  const [err,setErr] = useState(null);
  const navigate = useNavigate();
  const [load,setLoad ] = useState(false);
  const [load1,setLoad1 ] = useState(false);

  const fetchBlog = async () => {
    try {
      const res = await Blogfeatures.getBlog(id);

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

  const updateImg = async () => {
    const data = await Blogfeatures.updateBlogImg(id, file);
    
    if (data.error) {
    console.log("Error updating image", data.error);
    }
   };

  const update = async () => {
    
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;

    const data = await Blogfeatures.updateBlog(id, updateData);


    if (data?.error) {
        console.log("Error  blog", data.error);
    }
   };

   const handle = async()=>{
    if(file){
        await updateImg();
    }
    await update();
    setLoad1(false);
    navigate(`/blog/${id}`);
   }




  useEffect(() => {
    fetchBlog();
  }, []);

  useEffect(()=>{
    setTitle(blog.title || "");
    setContent(blog.content || "");
  },[blog])

  if(load) return(
    <Load/>
  )

  if(err) return(
    <p>{err}</p>
  )

  return (
    <div className="p-6 w-full mt-10 text-white ">
      <div className="ml-30 w-[50%] h-[85vh] ">
            {/* Post Title */}
        <div className="bg-[#171717] px-15 py-10 ">
            <label className="p-2 border-2 rounded-md border-[#3b3b3b] cursor-pointer inline-block">
            {file?.name || "Change Cover Image"}
              <input type="file" className="hidden" onChange={(e)=>{setFile(e.target.files[0])}} />
            </label>
            
            <textarea
            className="w-full mt-3 text-5xl  font-bold min-h-[40px] text-white rounded-md  focus:outline-none resize-none overflow-hidden"
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

          <div className="px-15 pt-4 mt-4 bg-[#171717] rounded-md ">
          <textarea
            className="w-full mt-3 text-lg   h-[300px] text-white rounded-md  focus:outline-none resize-none overflow-hidden"
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

        {/* Action Buttons */}
        <div className="flex justify-between text-white mt-4">
          <button className="bg-purple-600 px-4 py-2 rounded-md" onClick={()=>{
            setLoad1(true);
            handle();
          }}>Update</button>
          {load1 ? <p>Loading...</p> : null}
        </div>
      </div>
    </div>
  );
}
