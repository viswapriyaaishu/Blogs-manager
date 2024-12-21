import React,{useState,useEffect} from 'react'
import authob from '../appwrite/conf'
import {Postcard,Container} from '../components/index.js'
function AllPosts() {

    const [posts,setposts]=useState([])

    useEffect(()=>{
        authob.getposts([]).then((post)=>{setposts(post.documents)})
    },[])
  return (
    <Container>
      <div className="flex flex-wrap gap-8 my-2">
      { posts.map((post)=>{
        return (<div key={post.$id}>
            <Postcard {... post}></Postcard>
        </div>)
        
      })}
      </div>
      
    </Container>
  )
}

export default AllPosts
