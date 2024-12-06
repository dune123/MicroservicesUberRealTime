import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignUp = () => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [firstname,setFirstname]=useState('');
  const [secondname,setSecondname]=useState('');
  const [userData,setUserData]=useState({});

  const submitHandler=(e)=>{
      e.preventDefault();

      setUserData({
        fullName:{
          firstname:firstname,
          secondname:secondname
        },
        email:email,
        password:password
      })
      
      setFirstname('');
      setSecondname('');
      setEmail('');
      setPassword('');
  }


  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-base font-medium mb-5">Whats's your captain name</h3>
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
            value={secondname}
            onChange={(e) => setSecondname(e.target.value)}
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
            Register
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
  )
}

export default CaptainSignUp