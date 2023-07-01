import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"
import { IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import working from '../../assets/working.png'
import './sidebar.scss'

const Sidebar = () => {
  const [cats, setCats] = useState([])
  useEffect(()=>{
    const getCats = async()=>{
      const res = await axios.get("http://localhost:4000/api/categories")
      setCats(res.data)
    }
    getCats()
  }, [])
  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src={working} alt="info"/>
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c)=>{
             <li className="sidebarListItem">
                <Link className="link" to={`/?cat=${c.name}`}>
                  {c.name}
                </Link>
              </li>
          })}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW ME</span>
        <div className="sidebarSocial">
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
      </div>
    </div>
  )
}

export default Sidebar