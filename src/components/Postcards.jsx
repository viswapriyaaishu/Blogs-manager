import React from 'react'
import {useSelector} from 'react-redux'
import authob from '../appwrite/conf'
import {Link,useNavigate} from 'react-router-dom' 
function Postcard({$id,title,featuredImage}) {
  

  return (
    <div>
      <Link to={`/post/${$id}`}>
      <img src={authob.getfilepreview(featuredImage)} style={{height:"250px"}}></img>
      </Link>
      <h2 className="flex justify-center"><b style={{fontFamily:"sans-serif"}}>{title}</b></h2>
    </div>
  )
}

export default Postcard
