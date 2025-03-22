import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useLocation } from 'react-router-dom';

export default function Sidebar(){
  const authStatus = useSelector(state=>state.auth.status);
  const location = useLocation();
  const a = location.pathname;
  const b = (a=="/my-blogs") ? 3 : (a=="/new") ? 4 : 1;
  const [color ,setColor] = useState(b);
  const links = [
    { name: "Home", icon: "🏠", path:"/" , val:1 },
    { name: "Reading List", icon: "📚" , path:"/" ,val:2},
    { name: "My Blogs", icon: "📝" , path:"/my-blogs"  ,val:3},
    { name: "Create Blog", icon: "✍️" , path:"/new"  ,val:4} // or  or "📄"
  ];
  
    return (
      authStatus ? (<div className="w-[200px] md:block hidden p-4  text-xl bg-black text-white h-screen ">
        <ul>
          {links.map((link) => (
            <Link to={link.path} key={link.name}>
              <li key={link.name} onClick={()=>{
                setColor(link.val)
              }} 
                className={`flex items-center ${color==link.val ? "text-blue-400" : ""} mb-4 cursor-pointer hover:text-blue-400`}>
                <span className="mr-2">{link.icon}</span> {link.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>) : null
    );
  };
  