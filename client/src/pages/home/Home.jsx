import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.scss'
import { useLocation } from 'react-router-dom'
// axios instead of js fetch

const Home = () => {
  const [posts, setPosts] = useState([])
  const {search} = useLocation()

  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await axios.get('http://localhost:4000/api/posts'+search)
      setPosts(res.data)
    }
    fetchPosts()
  }, [search])

  return (
    <>
        <Header/>
        <div className='home'>
            <Posts posts={posts}/>
            <Sidebar/>
        </div>
    </>
  )
}

export default Home