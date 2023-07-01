import React from 'react'
import './post.scss'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  const PF = "http://localhost:5000/images/"
  return (
    <div className='post'>

        {post.photo && <img src={PF+post.photo} alt='postImg'/>}
        <div className='postInfo'>
            <div className='postCat'>
              {post.categories.map((c)=>(
                <span>{c.name}</span>
              ))}  
            </div>
            <Link to={`/post/${post._id}`} className='link'>
              <span className='postTitle'>{post.title}</span>
            </Link>
            <hr/>
            <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p>{post.desc}</p>
    </div>
  )
}

export default Post