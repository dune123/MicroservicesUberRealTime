import React,{useContext, useEffect,useState} from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserProtextWrapper = ({children}) => {

    const token=localStorage.getItem('token');
    const [user,setUser]=useContext(UserDataContext);
    const [ isLoading, setIsLoading ] = useState(true)
    const navigate=useNavigate();
    
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
            })
    }, [ token ])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtextWrapper