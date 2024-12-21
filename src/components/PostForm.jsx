import React,{useState,useEffect,useCallback} from 'react'
import authob from '../appwrite/conf'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {Input,Button,Select,Protecto} from './index'
function PostForm({post}) {
    const navigate=useNavigate()
    const userData=useSelector(state=>state.auth.userData)
    console.log("UserData:", userData);
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:
        {
            title:post?post.$id:"",
            content:post?post.content:"",
            slug:post?post.slug:"",
            status:post?post.status:" "
        }
    })
    const postu=async(data)=>
    {
        try{
            if(post)
            {
                const file=data.image[0] ?await  authob.createfile(data.image[0]) : null
                if(file)
                {
                    await authob.deletefile(post.featuredImage)
                }

                const up=await authob.updatePost(post.$id,{
                    ... data,
                    featuredImage:file?file.$id:undefined
                })
                if(up)
                {
                    navigate(`/post/${up.$id}`)
                }
            }
            else{
                const file=await authob.createfile(data.image[0])
                if(file)
                {
                    data.featuredImage=file.$id
                    const dbpost=await authob.createPost({
                        ... data,
                        userId:userData.$id
                    })
                    if(dbpost)
                    {
                        navigate(`/post/${dbpost.$id}`)
                    }
                }
               
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }

    const slugproduced=useCallback((value)=>
    {   if(value && typeof value=='string')
    {return value.trim().toLowerCase().replace(/\s+/g,'-');}
        return ""

    },[])

    useEffect(()=>{
        const subscription=watch((value,{name})=>
        {
            if(name=='title')
            {
                setValue('slug',slugproduced(value.title,{shouldValidate:true}))
            }
        })
        return ()=>
        {
            return subscription.unsubscribe()
        }
    },[slugproduced,setValue,watch('title')])


  return (
    <div className="w-full h-screen">
        <form onSubmit={handleSubmit(postu)} className="flex">
        <div className="w-2/3 flex flex-col gap-3 ">
        <div className='h-[3vh]'></div>
        <Input label="Title" type="title" className="rounded-lg ml-1" {...register('title',{required:true})} style={{height:"4vh",width:"50vw"}}></Input>
        <Input label="Slug" type="title" className="rounded-lg ml-1" {...register('slug',{required:true})}  onInput={(e)=>{setValue('slug',e.currentTarget.value,{shouldValidate:true})}} style={{height:"4vh",width:"50vw"}}></Input>
        <Protecto label="Content" control={control} defaultValue={getValues("content")} name="content"></Protecto>
        </div>
      <div className="w-1/3 flex flex-col gap-3 mx-2">
      <div className='h-[3vh]'></div>
      <Input type="file" label="Featured Image" accept="image/jpg image/jpeg image/png image/gif" {...register('image',{
        required:!post
      })}></Input>
      {post && <img src={authob.getfilepreview(post.featuredImage)} alt="image"></img>}
      <div className='h-[3vh]'></div>
      <Select options={['active','inactive']} label="status" {...register('status',{required:true})} className="space-x-2"></Select>
      <div className='h-[3vh]'></div>
      <Button type="submit" className='bg-blue-500 px-2 rounded-lg w-[25vw]'>Submit</Button>
      </div>
        </form>
    </div>
  )
}

export default PostForm
