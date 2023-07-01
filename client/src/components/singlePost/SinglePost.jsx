import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import './singlePost.scss'
import User from '../../../../api/models/User';
import { Context } from '../../context/Context';


const SinglePost = () => {
  const location = useLocation()
  const path = location.pathname.split("/")[2]
  const [post, setPost] = useState({})
  const PF = "http://localhost:5000/images/"
  const {user} = useContext(Context)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [updateMode, setUpdateMode] = useState(false)

  useEffect(()=>{
    const getPost = async()=>{
        const res =  await axios.get("http://localhost:4000/api/posts/"+path)
        console.log(res)
        setPost(res.data)
        setTitle(res.data.title)
        setDesc(res.data.desc)
    }
    getPost()
  }, [path])

  const handleDelete = async()=>{
    try{
        await axios.delete("http://localhost:4000/api/posts/"+path, {data: {username:user.username}})
        window.location.replace("/")
    }catch(err){}    
  }

  const handleUpdate = async ()=>{
    try{
        await axios.put(`http://localhost:4000/api/posts/${post._id}`, {
            username: user.username, title, desc
        })
        setUpdateMode(false)
    }catch(err){}
  }

  return (
    <div className='spost'>
        <div className='postWrapper'>
            {post.photo&&<img
                src={PF+post.photo}
                alt=''
            />}{
                updateMode?<input type='text' value={title} className='singlePostTitleInput' autoFocus onChange={(e)=>setTitle(e.target.value)}/>:(
                <h1>
                    {title}
                    {post.username===user?.username&&(
                    <div className='postEdit'>
                        <IconButton>
                            <ModeEditIcon  className='icons' onClick={()=>setUpdateMode(true)}/>
                        </IconButton>
                        <IconButton>
                            <DeleteIcon className='icons' onClick={handleDelete}/>
                        </IconButton>
                    </div>)}
                </h1>
                  )
                }
            <div className='postInfo'>
                <span className={post.username}>
                    Author: 
                    <Link to={`/?user=${post.username}`} className="link">
                        <b>{post.username}</b>
                    </Link>
                </span>    
                <span className='postdDate'>{new Date(post.createdAt).toDateString()}</span>
                
            </div>
            {updateMode?<textarea value={desc} className='singlePostDescInput' onChange={(e)=>setDesc(e.target.value)}/>:(
            <p>
                {desc}
            </p>
            )}
            {updateMode&&<button className='singlePostButton' onClick={handleUpdate}>Update</button>}
        </div>
    </div>
  )
}

export default SinglePost