import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useParams,useNavigate,Link} from 'react-router-dom'
import authob from '../appwrite/conf'
import { Container,Postcard,Button } from '../components/index'
import parse from "html-react-parser"
import '../../src/App.css'
import EditPost from './EditPost'
function Post() {
    const [post,setpost]=useState(null)
    const {slug}=useParams()
    const userdata=useSelector(state=>state.auth.userData)
    const isauthor= post && userdata ? post.userId === userdata.$id: false
    const navigate=useNavigate();
    const del=()=>
    {
        authob.deletePost(post.$id).then((status)=>
        {
            if(status){authob.deletefile(post.featuredImage)}
            else{navigate("/")}
        })
    }
    useEffect(()=>
    {
        if(slug){authob.getpost(slug)
          .then((post)=>{if(post)
        {
          setpost(post)} else{navigate("/")}})}
        else{navigate("/")}
        
    },[slug,navigate])

  
    if (!post) {
      return <div>Loading...</div>;}
  return (
    <div className="flex flex-col items-center">
      
        <Container className="flex flex-row  gap-3 justify-center">
          <div className="d1">
         <img src={authob.getfilepreview(post.featuredImage)} alt={post.title} style={{height:"500px"}} className="img1"></img>
        {
        isauthor && (<div>
           <div className="but">
           <Link to={`/editpost/${post.$id}`}>
            <Button className="bg-green-500 px-2 text-white rounded-lg">Edit</Button>
        </Link>

      <Button onClick={del} className="bg-red-300 px-2 text-white rounded-lg">Delete</Button>
            </div></div>)
      }
          </div>
        </Container>
       <div className="pt-5"><b style={{fontFamily:"sans-serif"}}>{post.title}</b></div>     
       <div>{parse(post.content)}</div>
      
    </div>
  )
}

export default Post
