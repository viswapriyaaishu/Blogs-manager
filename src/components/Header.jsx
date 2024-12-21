import React from 'react'
import {useSelector} from 'react-redux'
import { authSlice } from '../store/authSlice'
import {Link,useNavigate} from 'react-router-dom'
import Logo from './Logo'
import LogoutBtn from '../LogoutBtn'
import Container from './Container'
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
  return (
    <div>
    <header>
    <Container className="w-full">
        
        <nav className="flex text-white gap-3 justify-center bg-black ">
            <div>
                <Link to='/'><Logo></Logo></Link>
            </div>

            <ul className="flex gap-3">
                {nait.map((it)=>
                (
                    it.active && (<li key={it.name}>
                        <button className="hover:bg-blue-400 rounded-lg px-2" onClick={()=>{navigate(it.slug)}}>{it.name}</button>
                    </li>)
                ))}
            </ul>
            {
                authStatus && <LogoutBtn></LogoutBtn>
            }
        </nav>
      </Container>
    </header>
    </div>
  )
}

export default Header
