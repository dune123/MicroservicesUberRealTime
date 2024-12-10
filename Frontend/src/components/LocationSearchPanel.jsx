import React from 'react'

const LocationSearchPanel = ({setPanelOpen,setVehiclePanel}) => {

  //sample array of locations
  const locations=[
      '24B, Near kappor cafe, Bhopal Mp',
      'G block rohini sector 15 New delhi',
      'F block rohini sector 13 New delhi Delhi',
      '34 B block rohini scetaf dssfas fvsdsfsf'
  ]
  return (
    <div>
        {/** THis is just a sample data */}
        {
          locations.map((item,index)=>(
            <div key={index} className='flex items-center border-2 p-2 pl-5 pr-5 gap-4 my-2 w-80 rounded-xl border-gray-50 active:border-black' onClick={()=>{setVehiclePanel(true)
              setPanelOpen(false)
            }}>
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{item}</h4>
        </div>
          ))
        }
    </div>
  )
}

export default LocationSearchPanel