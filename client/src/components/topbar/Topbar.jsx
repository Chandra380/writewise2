import React, { useContext } from 'react'
import { IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import happy from '../../assets/happy.png'
import { Link } from 'react-router-dom';
import './topbar.scss'
import { Context } from '../../context/Context';

const Topbar = () => {
  const {user, dispatch} = useContext(Context)
  const PF = "http://localhost:5000/images/"

  const handleLogout = ()=>{
    dispatch({type:"LOGOUT"})
  }

  return (
    <div className='topbar'>
      <div className='left'>
        <IconButton size='small'>
          <TwitterIcon style={{color:'rgb(65, 65, 65)'}}/>
        </IconButton>
        <IconButton size='small'>
          <LinkedInIcon style={{color:'rgb(65, 65, 65)'}}/>
        </IconButton>
        <IconButton size='small'>
          <GitHubIcon style={{color:'rgb(65, 65, 65)'}}/>
        </IconButton>
      </div>
      <div className='center'>
        <ul>
          <li>
            <Link to='/' className='link'>HOME</Link>
          </li>
          <li>
            <Link to='/about' className='link'>ABOUT</Link>
          </li>
          <li>
            <Link to='/contact' className='link'>CONTACT</Link>
          </li>
          <li>
            <Link to='/write' className='link'>WRITE</Link>
          </li>
          <li onClick={handleLogout}>{user&&'LOGOUT'}</li>
          <li>
            <IconButton size='small'>
              <SearchIcon style={{color:'black'}}/>
            </IconButton>
          </li>  
        </ul>
      </div>
      <div className='right'>
        {user?(<Link to='/settings'><img src={PF+user.profilePic} alt='myimg'/></Link>)
        :(
          <Link className='link' to='/login'>LOGIN</Link>
        )}
      </div>
    </div>
  )
}
export default Topbar