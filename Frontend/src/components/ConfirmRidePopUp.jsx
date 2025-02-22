import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = ({ride,setConfirmRidePopUpPanel,setRidePopUpPanel,}) => {
    const [otp,setOtp]=useState('')
    const navigate=useNavigate()

    const submitHandler=async(e)=>{
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            setConfirmRidePopUpPanel(false)
            setRidePopUpPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }

    }
    return (
    <div>
         <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={()=>{setRidePopUpPanel(false)}}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
        <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>
        <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
                <img className='h-12 rounded-full object-cover w-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"/>
                <h2 className='text-lg font-medium capitalize'>{ride?.user.fullname.firstname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-base text-gray-600 -mt-1'>{ride?.pickup}</p>
            </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
               {/* <h3 className='text-lg font-medium'></h3>*/}
                <p className='text-base text-gray-600 -mt-1'>{ride?.destination}</p>
            </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
                <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                <p className='text-base text-gray-600 -mt-1'>Cash</p>
            </div>
            </div>
        </div>
        <div className='mt-6 w-full'>
        <form onSubmit={()=>{
            submitHandler(e)
        }}>
        <input value={otp} placeholder='Enter OTP' className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
              type="text" onChange={(e)=>setOtp(e.target.value)}/>
        <Link to='/captain-riding' className='flex justify-center w-full mt-5 text-lg bg-green-600 text-white font-semibold p-3 rounded-lg'>
            Confirm 
        </Link>
        <button onClick={()=>{
            setConfirmRidePopUpPanel(false)
            setRidePopUpPanel(false)
            }}
         className='w-full mt-1 bg-red-500 text-white font-semibold p-3 rounded-lg'>
            Cancel
        </button>
        </form>
        </div>
        </div>
    </div>
  )
}

export default ConfirmRidePopUp