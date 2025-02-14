import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserDataContext} from "../context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const UserLogin = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const [user,setUser]=useContext(UserDataContext);
    const navigate=useNavigate();

    const submitHandler=async(e)=>{
        e.preventDefault();


        const userData={
            email:email,
            password:password
        }
        try {
            const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)

            if(response.status===200){
                const data=response.data;
                setUser(data.user);
               
                localStorage.setItem('token',data.authToken);
                navigate('/home');
            }
            else{
                console.log(response.data);
                toast.error(response.data.message);
            }
            setEmail('');
            setPassword('');
        } catch (error) {
            toast.error(error.error);
        }
    }

    const CloseButton = ({ closeToast }) => (
        <i className="material-icons" onClick={closeToast}>
          X
        </i>
      );
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <ToastContainer
              style={{ height: "7vh", width: "30vw" }}
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              closeButton={CloseButton}
            />
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