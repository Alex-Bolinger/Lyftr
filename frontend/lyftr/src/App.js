import React, { useState } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/profile';
import Index from './pages';
import Login from './pages/login';
import SignUp from './pages/signup';
import Home from "./pages/home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path="Profile" element={<Profile/>}></Route>
        <Route path="Login" element={<Login/>}></Route>
        <Route path="SignUp" element={<SignUp/>}></Route>
        <Route path="Home" element={<Home/>}></Route>
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;