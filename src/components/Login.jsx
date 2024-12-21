import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Input,Button,Logo} from '../components/index'
import {login,logout} from '../store/authSlice'
import authobj from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import {Link} from 'react-router-dom'
function Login()
{
    const [error,seterror]=useState("")
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()

    const logi=async(data)=>{
        seterror("")
            try{
                const res=await authobj.getLogin()
                if(res)
                {
                    dispatch(login(res))
                    navigate("/")
                }
                else{
                    const userdata=await authobj.login(data)
                    if(userdata)
                    {
                        const ans=await authobj.getLogin()
                        if(ans)
                        {
                            dispatch(login(ans))
                            navigate("/")
                        }
                    }
                    else{
                        seterror("Invalid email or password. Please try again.");
                    }
                }
                
            }
            catch(error)
            {
                console.log(error.message)
                seterror("Invalid email or password. Please try again.")
            }
        
    }
    return(
        <div className="flex flex-col items-center">
            <Logo></Logo>
            <p>Sign in to your account</p>
            <p className="space-y-5">
                Don&apos;t have an account
                <div><Link to='/signup'><p className='text-blue-500'>sign up</p></Link></div>
                
            </p>
            {error && <p className="text-green">{error}</p>}
            <form onSubmit={handleSubmit(logi)}>
                <Input label="Email:" placeholder=" Enter your email" className="rounded" style={{width:"40vw",height:"5vh"}} {...register("email",{
                    required:true,
                    validate:
                    {
                        matchPattern:(val)=>{
                          return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)||"Enter a valid email"
                        }
                    }
                })}></Input>

                <Input label="Password: " type="password" placeholder=" Enter your password" className="rounded" style={{width:"40vw",height:"5vh"}} {...register("password",{
                    required:true
                })}></Input>
                <div className='h-[3vh]'></div>
                <Button type="submit" className='bg-green-500 rounded px-4 py-2'>Login </Button>
            </form>
        </div>
    );
}

export default Login