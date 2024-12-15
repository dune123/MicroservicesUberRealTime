import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom'
import CaptainDetail from '../components/CaptainDetail'
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';


const CaptainHome = () => {
    const [ridePopUpPanel,setRidePopUpPanel]=useState(true)
    const [confirmRidePopUpPanel,setConfirmRidePopUpPanel]=useState(false);

    const ridePopUpPanelRef=useRef(null);
    const confirmRidePanelRef=useRef(null);

    useGSAP(function () {
      if (ridePopUpPanel) {
          gsap.to(ridePopUpPanelRef.current, {
              transform: 'translateY(0)'
          })
      } else {
          gsap.to(ridePopUpPanelRef.current, {
              transform: 'translateY(100%)'
          })
      }
    }, [ ridePopUpPanel ])

    useGSAP(function () {
      if (confirmRidePopUpPanel) {
          gsap.to(confirmRidePanelRef.current, {
              transform: 'translateY(0)'
          })
      } else {
          gsap.to(confirmRidePanelRef.current, {
              transform: 'translateY(100%)'
          })
      }
    }, [ confirmRidePopUpPanel ])

  return (
    <div className="h-screen">
    <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
    <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
    <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
       </Link>
    </div>
 <div className="h-3/5">
   {/* When UI done then put the current location to this components */}
   <div className="h-full w-full bg-red-400"></div>
 </div>
 <div className='h-2/5 p-6'>
   <CaptainDetail/>
 </div>
 <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12 translate-y-full'>
    <RidePopUp setRidePopUpPanel={setRidePopUpPanel}/>
 </div>
 <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12 translate-y-full'>
    <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
 </div>
 <div ref={confirmRidePanelRef} className='fixed w-full h-screen z-10 bottom-0  bg-white px-3 py-10 pt-12 translate-y-full'>
    <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
 </div>
</div>
  )
}

export default CaptainHome