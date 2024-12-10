import React, { useContext, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/userContext";

const UserRegister = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [firstname,setFirstname]=useState('');
    const [lastname,setLastname]=useState('');

    const navigate=useNavigate();
    
    const [user,setUser]=useContext(UserDataContext);

    const submitHandler=async(e)=>{
        e.preventDefault();
        const newUser={
            fullname:{
              firstname:firstname,
              lastname:lastname
            },
            email:email,
            password:password
        }
        
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)

        if(response.status===201){
          const data=response.data;

          setUser(data.user)
          navigate('/home');
        }

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
    }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-base font-medium mb-5">Whats's your name</h3>
          <div className="flex gap-4 mb-2">
          <input
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border text-base w-1/2 placeholder:text-sm mb-5"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Firstname"
          />
          <input
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border text-base w-1/2 placeholder:text-sm mb-5"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Last name"
          />
          </div>
          <h3 className="text-base font-medium mb-2">Whats's your email</h3>
          <input
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm mb-6"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example!@example.com"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            placeholder="password"
          />
          <button className="bg-[#111] text-white  rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?
          <Link className="text-blue-600" to="/login">
            Login
          </Link>
        </p>
      </div>
      <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
    </div>
  );
};

export default UserRegister;
