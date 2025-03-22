import { useEffect, useState } from "react";
import BlogPost from "./Blogpost";
import Blogfeatures from "../backend/blogConfig"
import { useDispatch , useSelector } from "react-redux";
import { setBlogs } from "../store/blogSlice";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function MainContent(){
  const [loading , setLoading] = useState(true);
  const [err , setErr] = useState(null);
  const dispatch = useDispatch();
  const authStatus = useSelector(state => state.auth.status);
  const user = useSelector(state=>state.auth.userData);
  const [blogs,setBlogs] = useState([]);
  const location = useLocation();


  function getBlogs(){
    Blogfeatures.getAllBlogs()
        .then((data) => {
          if (data.error) setErr(data.error);
          else setBlogs(data);
        })
        .catch((error) => setErr(error.message))
        .finally(() => setLoading(false));
  }

  function getBlogByUsers(){
    Blogfeatures.getUserBlogs(user?._id)
        .then((data) => {
          if (data.error) setErr(data.error);
          else setBlogs(data);
        })
        .catch((error) => setErr(error.message))
        .finally(() => setLoading(false));
  }


  useEffect(() => {
    setLoading(true);
    setErr(null); 
    if (location.pathname === "/my-blogs") {
      getBlogByUsers();
    } else {
      getBlogs();
    }
  }, [location.pathname, user]);
  
  

  if(loading) return ( 
  <div className="mx-auto mt-10 text-xl">
    <h2>loading...</h2>
  </div> 
  );
  
  if(err) return ( 
    <div className="mx-auto mt-10 text-xl">
      <h2>{err}</h2>
    </div>
   );

    return (
      <main className="w-full md:w-[55%] ">
        
        {blogs.map((post) => (
          <Link to={`/blog/${post._id}`} key={post._id}><BlogPost key={post._id} blog={post} /></Link>
        ))}
      </main>
    );
  };
  