import React, { useContext } from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './setting.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios'
import { Context } from '../../context/Context';

const Setting = () => {

    const [file, setFile] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)

    const {user, dispatch} = useContext(Context)
    const PF = "http://localhost:5000/images/"

    const handleSubmit = async (e)=>{
        e.preventDefault()
        dispatch({type:"UPDATE_START"})
        const updatedUser = {
            userId: user._id,
            username, email, password
        }
        if(file){
            const data = new FormData()
            const filename = Date.now()+file.name
            data.append("name", filename)
            data.append("file", file)
            updatedUser.profilePic = filename
            try{
                await axios.post("http://localhost:4000/api/upload", data)
            }
            catch(err){}
        }
        try{
            const res = axios.put("http://localhost:4000/api/users"+user._id, updatedUser)
            setSuccess(true)
            dispatch({type: "UPDATE_SUCCESS", payload: res.data})
        } catch(err){
            dispatch({type: "UPDATE_FAILURE"})
        }
    }

    return (
        <div className='setting'>
            <div className='settingWrapper'>
                <div>
                    <span className='upd'>Update Your Account</span>
                    <span className='del'>Delete Account</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className='pps'>
                        <img src={file ? URL.createObjectURL(file):PF+user.profilePic}/>
                        <label htmlFor='fileInput'>
                            <AccountCircleOutlinedIcon style={{
                                padding: '5px',
                                borderRadius: '50%',
                                marginLeft: '20px',
                                color: 'white',
                                backgroundColor: 'lightcoral',
                                cursor: 'pointer',
                            }}/>
                        </label>
                        <input type='file' id='fileInput' style={{display: 'none'}} onChange={(e)=>setFile(e.target.files[0])}/>
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} name="name" onChange={e=>setUsername(e.target.value)}/>
                    <label>Email</label>
                    <input type="email" placeholder={user.email} name="email" onChange={e=>setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type="password"  name="password" onChange={e=>setPassword(e.target.value)}/>
                    <button  type="submit">Update</button>
                    {success&&<span style={{color: "green", textAlign: "center", marginTop: "20px"}}>Profile has been updated...</span>}
                </form>
            </div>
            <Sidebar/>
        </div>
    )
}

export default Setting