import React, {useContext, useState} from 'react'
import axios from "axios"
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './write.scss'
import moon from '../../assets/moon.jpg'
import {Context} from '../../context/Context'

const Write = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const {user} = useContext(Context)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const newPost = {
            username: user.username,
            title, desc
        }
        if(file){
            const data = new FormData()
            const filename = Date.now()+file.name
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename
            try{
                await axios.post("http://localhost:4000/api/upload", data)
            }
            catch(err){}
        }
        try{
            const res = axios.post("http://localhost:4000/api/posts", newPost)
            window.location.replace("/post/"+res.data._id)
        } catch(err){}
    }

    return (
        <div className='write'>
            <form onSubmit={handleSubmit}>
                {file&&<img src={URL.createObjectURL(file)} alt='postImg'/>}
                <div>
                    <label htmlFor='fileInput'>
                        <AddIcon className='plus'/>
                    </label>
                    <input type='file' id='fileInput' style={{display: 'none'}} onChange={(e)=>e.target.files[0]}/>
                    <input type='text' placeholder='Title' className='writeInput' autoFocus={true} onChange={e=>setTitle(e.target.value)}/>
                </div>
                <div>
                    <textarea placeholder='Tell your story...' typeof='text' className="writeInput writeText" onChange={e=>setDesc(e.target.value)}></textarea>
                </div>
                <button type='submit'>Publish</button>
            </form>
        </div>
    )
}

export default Write