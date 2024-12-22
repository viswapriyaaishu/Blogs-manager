import { useState,useEffect } from 'react'

import './App.css'
import {login,logout} from './store/authSlice.js'
import authobj from './appwrite/auth.js'
import {useDispatch} from 'react-redux'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import {Outlet} from 'react-router-dom'
function App() {
  const [loading,setloading]=useState(true)
  
  const dispatch=useDispatch()
  useEffect(()=>{
    authobj.getLogin().then((userData)=>{
      if(userData)
      {
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(setloading(false))
  },[])

  return (
   !loading?(
    <div className="mx-auto bg-gray-300 w-[80vw] min-h-screen">
     <Header></Header>
     <main><Outlet></Outlet></main>
     <Footer></Footer>
    </div>
   ):null
  )
}

export default App
