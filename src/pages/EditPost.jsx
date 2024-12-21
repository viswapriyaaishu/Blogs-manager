import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate,Link} from "react-router-dom"
import {useParams} from 'react-router-dom'
import authob from '../appwrite/conf'
import Container from '../components/Container'
import {PostForm} from '../components/index.js'
function EditPost() {
    const [post,setpost]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if(slug)
        {
            authob.getpost(slug).then((res)=>
            {
                if(res)
                {
                  setpost(res)
                }
                else{
                  navigate("/")
                }
            })
        }
        else
        {
            navigate("/")
        }
    },[slug,navigate])
  return (
    <div>
      <Container>
        <PostForm post={post}></PostForm>
      </Container>
    </div>
  )
}

export default EditPost
