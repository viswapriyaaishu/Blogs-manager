import React,{useState} from 'react'
import {Input,Button,Logo} from './index'
import {useDispatch} from 'react-redux'
import authobj from '../appwrite/auth'
import {useForm} from 'react-hook-form'
import {Link,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
function Signup() {
    const[error,seterror]=useState("")
    const {register,handleSubmit}=useForm()
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const signu=async(data)=>
    {seterror("")
        try{
          console.log("Signup form data:", data);
            const session=await authobj.createlogin({email:data.email,password:data.password,name:data.name})
            console.log("Signup response:", session);
        if(session)
        {
            const userData= await authobj.getLogin()
            if(userData)
            {
                dispatch(login(userData))
               
            }
            navigate("/")
        }
        }
        catch(error)
        {
            console.log(error.message)
            seterror("SignUp failed. try again")
        }
    }
  return (
    <div className="flex flex-col items-center">
      <Logo></Logo>
      <p className="space-y-5">Create an Account</p>
      <p>Already have one ?
        <Link to="/login"><p className="text-blue-500">Login</p></Link>
      </p>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(signu)}>
        <Input type="email" label="Email" className="rounded" style={{width:"40vw",height:"5vh"}} placeholder=" Enter your email" {...register("email",{
            required:true,
            validate:
            {
                matchPattern:(val)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)||"Enter a valid email"
            }
        })}/>
        <Input type="password" placeholder=" Enter your password" className="rounded" style={{width:"40vw",height:"5vh"}} label="Password:" {...register("password",{
            required:true
        })}>
        </Input>
        <Input type="text" label="Name:" placeholder=" Enter your Name" className="rounded" style={{width:"40vw",height:"5vh"}} {...register("name",{
            required:true
        })}></Input>
        <div className="h-[3vh]"></div>
        <Button type="submit" className="bg-green-500 rounded-lg px-4 py-2">Submit</Button>
      </form>
    </div>
  )
}

export default Signup
