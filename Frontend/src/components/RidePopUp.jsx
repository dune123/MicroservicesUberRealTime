import React from 'react'

const RidePopUp = ({setRidePopUpPanel,setConfirmRidePopUpPanel}) => {
  return (
    <div>
         <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={()=>{setRidePopUpPanel(false)}}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
        <h3 className='text-2xl font-semibold mb-5'>New ride Available!</h3>
        <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
                <img className='h-12 rounded-full object-cover w-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"/>
                <h2 className='text-lg font-medium'>Mayank Pawar</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-base text-gray-600 -mt-1'>Kankariya Talab, Ahemdabad</p>
            </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
                <h3 className='text-lg font-medium'></h3>
                <p className='text-base text-gray-600 -mt-1'></p>
            </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
                <h3 className='text-lg font-medium'>₹193.20</h3>
                <p className='text-base text-gray-600 -mt-1'>Cash</p>
            </div>
            </div>
        </div>
        <div className='mt-5 flex w-full items-center justify-between'>
        <button onClick={()=>{setRidePopUpPanel(false)}}
         className='mt-1 bg-gray-400 text-gray-7 font-semibold p-3 px-10 rounded-lg'>
            Ignore
        </button>
        <button 
        onClick={()=>{
            setConfirmRidePopUpPanel(true);
        }} className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>
            Accept
        </button>
        </div>
        </div>
    </div>
  )
}

export default RidePopUp
