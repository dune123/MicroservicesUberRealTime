import React from 'react'

const WaitingForDriver = ({setWatingForDriver}) => {
  return (
    <div>
    <h5
    className="p-1 text-center w-[93%] absolute top-0"
    onClick={() => setWatingForDriver(false)}
  >
    <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
  </h5>
    <div className='flex items-center justify-between'>
    <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"/>
    <div className='text-right'>
      <h2 className='text-lg font-medium'>Sarthak</h2>
      <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP04 AB 1234</h4>
      <p className='text-sm text-gray-600'>Maruti Suzuzki Alto</p>
    </div>
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
   
    </div>
    
</div>
  )
}

export default WaitingForDriver