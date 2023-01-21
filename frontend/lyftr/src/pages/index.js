import React from 'react';
import Navbar from './components/Navbar'
  
const Index = () => {
  return (
    <div
      style={{
        display: 'inline',
        justifyContent: 'left',
        alignItems: 'left',
        height: '80vh'
      }}
    >
      <div>
        <Navbar/>
      </div>
      <div>
        <h1>Welcome to Lyftr</h1>
      </div>
    </div>
  );
};
  
export default Index;