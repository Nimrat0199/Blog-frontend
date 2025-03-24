import { useState } from "react";
import authService from "../backend/auth";
import {Link, useNavigate} from 'react-router-dom'

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [succ , setSucc] = useState(null);
  const [err , setErr] = useState(null);
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault();

    authService.createAccount({username,password})
    .then(res=>{
      if(res.error) setErr(res.error);
      else{
        setSucc("Account Created")
        navigate("/login")
      } 
      
    }).catch(err=>setErr(err.message));
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="bg-black p-6 rounded-lg shadow-lg w-[70%] md:w-[30%]">
        <h2 className="text-white text-2xl font-semibold text-center mb-4">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="username"
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
            className="w-full bg-blue-600  border-white  hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Sign Up
          </button>
          {succ ? <h2 className="text-white ">{succ}</h2> :  null}
          {err ? <h2 className="text-white ">{err}</h2> :  null}
        </form>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
