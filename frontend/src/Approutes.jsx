import React from 'react'
import {BrowserRouter, Route, Router, Routes} from "react-router";
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/Login';
import Protected from './features/auth/components/Protected';
import Home from './features/home/pages/Home';
import LikedSongs from "./pages/LikedSongs";
import EmotionTimeline from "./pages/EmotionTimeline";

const Approutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Protected><Home /></Protected>} />
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/favorites' element={<Protected><LikedSongs /></Protected>}/>
            <Route path='/history' element={<Protected><EmotionTimeline /></Protected>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Approutes
