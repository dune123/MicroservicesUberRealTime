import React,{useContext, useEffect,useState} from 'react'
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectedWrap = ({children}) => {
    const token=localStorage.getItem('token');
    
    const {captain,setCaptain}=useContext(CaptainDataContext);
    const navigate=useNavigate()
    const [ isLoading, setIsLoading ] = useState(true)


    useEffect(()=>{
        
        if(!token){
            navigate('/captain-login');
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/getCaptainProfile`,{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }).then((res)=>{
            if(res.status===200){
                setCaptain(res.data.captain);
                setIsLoading(false);
            }
        })
        .catch((err)=>{
            console.error(err);
            localStorage.removeItem('token');
            navigate('/captain-login');
        })

    },[token])

    if(isLoading){
        return (
            <div>Loading...</div>
        )
    }

    return(
        <>
            {children}
        </>
    )
}

export default CaptainProtectedWrap