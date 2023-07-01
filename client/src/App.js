import './App.css';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Setting from './pages/setting/Setting';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {BrowerRouter, Routes, Route, Link, BrowserRouter} from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const {user} = useContext(Context)
  return (
    <BrowserRouter>
      <Topbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={user?<Home/>:<Register/>}/>
        <Route path='/login' element={user?<Home/>:<Login/>}/>
        <Route path='/write' element={user?<Write/>:<Register/>}/>
        <Route path='/setting' element={user?<Setting/>:<Register/>}/>
        <Route path='/post/:postId' element={<Single/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
