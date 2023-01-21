import React from 'react';
import Navbar from './components/Navbar/postLoginNavbar';
  
const Home = () => {
  return (
    <div
      style={{
        display: 'inline',
        justifyContent: 'left',
        alignItems: 'Right',
        height: '80vh'
      }}
    >
      <Navbar/>
      <h1>Home</h1>
    </div>
  );
};
  
export default Home;