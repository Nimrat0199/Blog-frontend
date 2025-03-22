import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from "../backend/auth";
import { logout } from "../store/authSlice";
import Blogfeatures from '../backend/blogConfig';


export default function Header(){
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.userData?.username);
  const [text,setText] = useState("")
  const [load,setLoad] = useState(false);
  const [data,setData] = useState([]);
  const [disp,setDisp] = useState(false);

  const fetchBlogs = async () => {
    setLoad(true);
    const a = await Blogfeatures.searchBlogs(text);
    console.log("searched blog" , a);
    setData(a);
    setLoad(false);
};
  


  useEffect(()=>{
    fetchBlogs();
  },[text])

  const navItems = [ 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "Create Post",
        slug: "/new",
        active: authStatus,
    },
  ]

  const links = [
    { name: "Home", icon: "🏠", path:"/" , active: true, },
    { name: "Reading List", icon: "📚" , path:"/" ,active: authStatus,},
    { name: "My Blogs", icon: "📝" , path:"/my-blogs"  ,active: authStatus,},
    { name: "Create Post", icon: "✍️" , path:"/new"  ,active: authStatus,},
    { name: "Logout", icon: "✍️" , path:"/new"  ,active: authStatus,}
  ];

  const handleLogout =()=>{
    authService.logout()
    .then(res=>{
        console.log(res.message);
        dispatch(logout());
        navigate('/login');
    }).catch(err=>console.log(err.message));
  }


  return (
    <header className="bg-[#171717]  text-white pt-3 pb-1 px-1 md:px-3 ">
      <div  className='flex justify-between items-center'>
        <div className="flex items-center md:gap-2 gap-1 ">
          <span className={`mr-2 text-xl p-1 md:p-2 md:hidden hover:bg-[#818CF8] rounded-sm  ${disp ? "bg-[#818CF8]" : null}`} onClick={()=>setDisp(prev=>!prev)}>&#9776;</span>
          { disp ? <div className='text-white p-3 bg-black z-10 absolute top-15 left-0 text-lg border-[#3b3a3a] border-2 rounded-sm w-[180px]'>
            <ul>
              {links.map(it=>{
                return it.active ? <li className='py-1 hover:bg-[#8581f8ad]  rounded-sm '><Link to={it.path}>{it.icon} <span className='hover:underline'>{it.name}</span></Link></li> : null
              })}
            </ul>
          </div> : null
          }
          <Link to='/'>
          <h1 className="text-xl border-2 border-white p-2 rounded-lg font-bold">DEV</h1>
            </Link>
            
          <div>
            <input
            type="text"
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="Search..."
            className="bg-black border-1 border-[#3b3a3a] hidden text-white px-3 py-2 rounded-lg md:w-[50vw] md:block  "
            />
            { text.length > 0 && (
              <div className='absolute top-28 md:top-15 md:w-[50vw] w-[95vw] left-2 md:left-20 border-1 rounded-lg mt-1 bg-[#171717] border-white px-2 flex-col'>
                {!load ? (
                  data.map((item) => (
                    <div key={item._id || item.error} className='my-4'>
                      {item.error ? (
                        <div className='my-2'>{item.error}</div>
                      ) : (
                        <Link to={`/blog/${item._id}`} onClick={() => setText("")}>
                          <div>
                            <div className='text-sm'>@{item.author}</div>
                            <div>{item.title}</div>
                          </div>
                        </Link>
                      )}
                    </div>
                  ))
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            )}

          </div>
        </div>
        <div className='flex gap-2'>
          {navItems.map(item=>{
            return item.active ? <Link to={item.slug} key={item.slug}><button className={`border-[#818CF8] border-2 text-[#818CF8] lg:px-4 px-2 py-2 rounded-lg ${
              item.name === "Create Post" ? "md:block hidden" : ""
            }`}>{item.name}</button></Link> : null
          })}
          {authStatus ? <button onClick={handleLogout} className="border-[#818CF8] border-2 text-[#818CF8] lg:px-4 md:block hidden  px-2 py-2 rounded-lg">Logout</button> : null}
          {authStatus ? <span className="flex text-xl items-center gap-2">
            ♙  {userName}
            </span> : null}
        </div>
      </div>
      <div className='mt-2'>
      <input
          type="text"
          value={text}
          onChange={(e)=>setText(e.target.value)}
          placeholder="Search..."
          className="bg-black border-1 border-[#3b3a3a] text-white px-3 py-2 rounded-lg md:hidden w-full  "
          />
      </div>
    </header>
  );
};
