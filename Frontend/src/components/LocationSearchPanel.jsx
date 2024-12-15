import React from 'react'

const LocationSearchPanel = ({suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField}) => {

  //sample array of locations
  const handleSuggestionClick=(suggestions)=>{
    if(activeField==='pickup'){
      setPickup(suggestions);
    }
    else{
      setDestination(suggestions);
    }
  }
  return (
    <div>
        {/** THis is just a sample data */}
        {
          suggestions.map((item,index)=>(
            <div key={index} className='flex items-center border-2 p-2 pl-5 pr-5 gap-4 my-2 w-80 rounded-xl border-gray-50 active:border-black' onClick={()=>handleSuggestionClick(item)}>
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{item}</h4>
        </div>
          ))
        }
    </div>
  )
}

export default LocationSearchPanel