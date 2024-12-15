import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
    const [finishRidePanel,setFinishRidePanel]=useState(false);
    const finishRideUpPanelRef=useRef(null);

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRideUpPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRideUpPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
      }, [ finishRidePanel ])
  
  return (
    <div className="h-screen realtive">
    
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link to="/captain-home"
          className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        {/* When UI done then put the current location to this components */}
        <div className="h-full w-full bg-red-400"></div>
      </div>
      <div className="h-1/5 p-6 flex items-center justify-between bg-yellow-400 relative" onClick={()=>{
            setFinishRidePanel(true);
        }}>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl text-gray-200 ri-arrow-up-wide-line"></i>
      </h5>
        <h4 className="text-lg font-semibold">4 Km away</h4>
        <button className='flex justify-center w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg'>Complete Ride</button>
      </div>
      <div ref={finishRideUpPanelRef} className='fixed w-full h-screen z-10 bottom-0  bg-white px-3 py-10 pt-12 translate-y-full'>
    <FinishRide setFinishRidePanel={setFinishRidePanel}/>
 </div>
    </div>
  );
};

export default CaptainRiding;
