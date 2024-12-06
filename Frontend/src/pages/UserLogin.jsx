import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [userData,setUserData]=useState({});

    const submitHandler=(e)=>{
        e.preventDefault();

        setUserData({
            email:email,
            password:password
        })
        setEmail('');
        setPassword('');
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={(e)=>submitHandler(e)}>
            <h3 className='text-lg font-medium mb-2'>Whats's your email</h3>
            <input 
                required 
                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7'
                type='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
                placeholder='example!@example.com' />
            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input 
                required 
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' placeholder='password'/>
            <button className='bg-[#111] text-white mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'>login</button>
        </form>
        <p className='text-center'>New here?<Link className='text-blue-600' to='/signup'> Create New Account</Link></p>
        </div>
        <div>
            <Link to='/captain-login' className='flex justify-center items-center bg-[#10b461] text-white mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin