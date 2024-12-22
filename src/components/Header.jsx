import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import { authSlice } from '../store/authSlice'
import {Link,useNavigate} from 'react-router-dom'
import Logo from './Logo'
import LogoutBtn from '../LogoutBtn'
import Container from './Container'
import '../index.css'
function Header() {
    const authStatus=useSelector((state)=>(state.auth.status))
    
    const navigate=useNavigate()
    const nait=[
        {
            name:"Home",
            slug:"/",
            active:true
        },
        {
            name:"Login",
            slug:'/login',
            active:!authStatus
        },
        {
            name:"Signup",
            slug:'/signup',
            active:!authStatus
        },
        {
            name:"All posts",
            slug:'/all-posts',
            active:authStatus
        },
        {
            name:'Add post',
            slug:'/add-post',
            active:authStatus
        }
    ]

    const [open,setopen]=useState(false)
   
  return (
    <div>
    <header>
    <Container className="w-full">
        
        <nav className=" text-white bg-black ">
            <div>
                <Link to='/'><Logo className="mx-2"></Logo></Link>
            </div>
            <div className="menu text-white" onClick={()=>{setopen(!open)}}>
                <div className="men-line"></div>
                <div className="men-line"></div>
                <div className="men-line"></div>
            </div>
            <div className="navubaru">

            <ul className={open?"khula":""} text-white>
                {nait.map((it)=>
                (
                    it.active && (<li key={it.name}>
                        <button className="hover:bg-blue-400 rounded-lg px-2" onClick={()=>{navigate(it.slug)}}>{it.name}</button>
                    </li>)
                ))}
                 {
                authStatus && <li><LogoutBtn></LogoutBtn></li>
            }
            </ul>
           
            </div>
        </nav>
      </Container>
    </header>
    </div>
  )
}

export default Header
