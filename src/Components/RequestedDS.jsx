import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/User/UserContext';
import axios from 'axios';



const RequestedDS = ({ setUser }) => {
    const { user, getUserDetails } = useContext(UserContext)




    const Navigate = useNavigate();
    const logout = async () => {
        await axios.get('/api/auth/logout');
        await getUserDetails();
        setUser(user);
        Navigate('/login');
        window.location.reload();
    }


    return (
        <>
            <h1>Currently, Your Request for a Dropshipper Account is under Process. You can Login After Your request is Entertained by our Team.</h1>
            <button onClick={logout}>LOGOUT</button>
        </>
    )
}

export default RequestedDS