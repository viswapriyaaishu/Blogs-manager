import React,{useState,useEffect} from 'react'
import authob from '../appwrite/conf'
import {Postcard} from '../components/index'
import {useNavigate} from 'react-router-dom'
function Home() {
    const [posts,setposts]=useState([])
    useEffect(()=>{
        authob.getposts().then((post)=>
        {console.log(post);
          setposts(post.documents)

        }).catch(error=>{
          console.log(error)
        })
    },[])
  return (
    <div className="flex flex-wrap gap-8 my-2 mx-1">
      {
        posts.map((post)=>
        (
          <div key={post.$id}>
            <Postcard {... post}></Postcard>
            </div>
        ))
      }
    </div>
  )
}

export default Home
