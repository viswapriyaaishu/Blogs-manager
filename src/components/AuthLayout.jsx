import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useSelector} from "react-redux"
function AuthLayout({children,authentication=true}) {
const [loader,setloader]=useState(true)
const navigate=useNavigate()
const authstate=useSelector(state=>state.auth.status)

useEffect(()=>{
  console.log("Auth State:", authstate, "Authentication:", authentication);
if(loader)
{if(authentication && !authstate)
{
    navigate("/login")
}
else if(!authentication && authstate)
{
    navigate("/")
}}
setloader(false)
},[authentication,navigate,authstate])
  return !loader ? (children):"Loading ..."
}

export default AuthLayout
