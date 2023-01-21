import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'
import PostNavbar from './components/Navbar/postLoginNavbar';
  
const Index = () => {
  let loggedIn = useLocation().state.loggedIn;
    console.log(loggedIn);
  if (!loggedIn) {
    return (
      <div
        style={{
          display: 'inline',
          justifyContent: 'left',
          alignItems: 'left',
          height: '80vh'
        }}>
        <div>
          <Navbar/>
        </div>
        <div>
          <h1>Welcome to Lyftr</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: 'inline',
          justifyContent: 'left',
          alignItems: 'Right',
          height: '80vh'
        }}
      >
        <PostNavbar/>
        <h1>Home</h1>
      </div>
    );
  }
};
  
export default Index;