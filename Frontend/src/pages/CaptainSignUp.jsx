import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/captainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [secondname, setSecondname] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate=useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: secondname,
      },
      email: email,
      password: password,
      vehicle:{
        color:vehicleColor,
        plate:vehiclePlate,
        capacity:vehicleCapacity,
        vehicleType:vehicleType
      }
    };

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,captainData)

    if(response.status==201){ 
      const data=response.data;
      setCaptain(data.savedCaptain);
      localStorage.setItem('token',data.authToken);
      navigate('/captain-home')
    }

    setFirstname("");
    setSecondname("");
    setEmail("");
    setPassword("");
    setVehicleCapacity('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleType('');


  };

  return (
    <div className="py-5 px-5  flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-base font-medium mb-5">
            Whats's your captain name
          </h3>
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
          <h3 className="text-base font-medium mb-2">Vehicle Information</h3>
          <div className="flex flex-wrap gap-4 mb-7">
          <input
            required
            className='bg-[#eeeeee] w-[160px] rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            type="text"
            placeholder='Vehicle Color'
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
          />
          <input
            required
            type="text"
            className='bg-[#eeeeee] w-[159px] rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            value={vehiclePlate}
            placeholder="Vehicle Plate"
            onChange={(e) => setVehiclePlate(e.target.value)}
          />
          <input
            required
            type="text"
            className='bg-[#eeeeee] w-[160px] rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            placeholder="Vehicle Capacity"
          />
          <select
            required
            className='bg-[#eeeeee] w-[159px] rounded-lg px-4 py-2 border text-lg placeholder:text-base'
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="" disabled>Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="moto">Moto</option>
          </select>
          </div>
          <button className="bg-[#111] text-white  rounded px-4 py-2  w-full text-lg placeholder:text-base">
            Create Captain account
          </button>
        </form>
        <p className="text-center">
          Already have an account?
          <Link className="text-blue-600" to="/captain-login">
            Login
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] mt-20 leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
