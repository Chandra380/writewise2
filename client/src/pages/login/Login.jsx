import React, { useContext, useRef } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import './login.scss'
import { Context } from '../../context/Context'

const Login = () => {
  const userRef = useRef()
  const passwordRef = useRef()
  const {dispatch, isFetching} = useContext(Context)

  const handleSubmit = async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.password.value,
      })
      dispatch({type:"LOGIN_SUCCESS", payload: res.data})
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"})
    }
  }
  return (
    <div className='login'>
        <span>Login</span>
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type='text' placeholder='username...' ref={userRef}/>
            <label>Password</label>
            <input type='password' placeholder='password...' ref={passwordRef}/>
            <button className='lg' type='submit' disabled={isFetching}>
              Login
            </button>
        </form>
        <button className='rg'>
          <Link to='/register' className='link'>Register</Link>
        </button>
    </div>
  )
}

export default Login