import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../finance'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { signOut } from 'firebase/auth';
import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';


function Header() {

    const [user,loading,] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user){
            navigate('/dashboard')
        }
    },[user,loading])

    function logoutfn(e){
        e.preventDefault()
        try{
            signOut(auth).then(() => {
               toast.success("Logged out!")
               navigate('/')
              }).catch((error) => {
                toast.error(error.message)
              });
        }
        catch(err){
            toast.error("Failed to logout!")
        }
    }

  return (
    <div className='bg-blue-400 p-4 font-semibold  flex items-center
    justify-between'>
        <p className='p-2'>WALLET</p>
        {
            user && (
            <div className='flex justify-center items-center'>
                <PersonIcon/>
                <Link onClick={logoutfn} className='p-2  hover:text-gray-700'>Logout</Link>
            </div>
            )
        }
        
    </div>
  )
}

export default Header
