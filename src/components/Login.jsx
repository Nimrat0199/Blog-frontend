import { useState } from "react";
import authService from "../backend/auth";
import {useDispatch} from "react-redux"
import { login } from "../store/authSlice";
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading] = useState(false);
  const [err , setErr] = useState(null);
  const [succ , setSucc] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", username, password);
    authService.login({username,password})
    .then(res=>{
      if(res.error) setErr(res.error);
      else{
        dispatch(login(res));
        setSucc("login successfull");
        navigate("/");
      } 
    }).catch(err=>setErr(err.message));
  };

  return (
    <div className="flex  h-screen justify-center items-center ">
      <div className="   rounded-lg shadow-lg w-[70%] md:w-[30%]">
        <h2 className="text-white text-2xl font-semibold text-center mb-4">
          Login 
        </h2>
        {err ? <h3 className="text-white ">{err}</h3> : null}
        {succ ? <h3 className="text-white ">{succ}</h3> : null}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-black border-2 border-white text-white rounded-md outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-black border-2 border-white text-white rounded-md outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 border-white hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
      </div>
  );
}
