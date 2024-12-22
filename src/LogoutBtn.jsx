import React from 'react'
import {useDispatch} from 'react-redux'
import { logout } from './store/authSlice.js'
import authobj from './appwrite/auth.js'
import {useNavigate} from 'react-router-dom'

function LogoutBtn() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const logos=()=>
    {
        authobj.logout().then(()=>
        {
          dispatch(logout());
            navigate("/login");
        })
    }
  return (
    <button onClick={logos} className="text-white hover:bg-blue-400 rounded-lg px-2">
        Logout
        </button>
  )
}

export default LogoutBtn
