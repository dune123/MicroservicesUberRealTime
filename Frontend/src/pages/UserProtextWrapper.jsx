import React,{useContext, useEffect} from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';


const UserProtextWrapper = ({children}) => {

    const token=localStorage.getItem('token');
    const {user}=useContext(UserDataContext);
    const navigate=useNavigate()

    if(!token){
        navigate('/login')
    }

    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
    },[token])
    return(
        <>
            {children}
        </>
    )

}

export default UserProtextWrapper