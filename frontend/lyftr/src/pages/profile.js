
import React from 'react';
import Navbar from './components/Navbar/postLoginNavbar'
  
const Profile = () => {
  return (
    <div
      style={{
        display: 'inline',
        justifyContent: 'left',
        alignItems: 'Right',
        height: '80vh'
      }}
    >
      <div>
        <Navbar/>
      </div>
      <div>
        <h1>Profile</h1>
      </div>
    </div>
  );
};
  
export default Profile;