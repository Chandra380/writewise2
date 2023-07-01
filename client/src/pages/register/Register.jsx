import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './register.scss'

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setError(false)
    try{
      const res =  await axios.post("http://localhost:4000/api/auth/register", {
        username, email, password
      })
      res.data && window.location.replace("/login")
    }catch(err){
      setError(true)
    }
  }
  return (
    <div className='register'>
        <span>Register</span>
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type='text' placeholder='username...'
            onChange={e=>setUsername(e.target.value)}
            />
            <label>Email</label>
            <input type='text' placeholder='email...'
            onChange={e=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input type='password' placeholder='password...'
            onChange={e=>setPassword(e.target.value)}
            />
            <button className='rg'>Register</button>
        </form>
        <button className='lg'>
          <Link to='/login' className='link'>Login</Link>
        </button>
        {error&&<p style={{color:"crimson", fontWeight:600, fontSize:"18px"}}>something went wrong</p>}
    </div>
  )
}

export default Register