import React from 'react';
import { AuthContext } from "../App";

const Profile = () => {
    const { authState, authDispatch } = React.useContext(AuthContext);

  return (
    <div
      style={{
        display: 'inline',
        justifyContent: 'left',
        alignItems: 'Right',
        height: '80vh'
      }}
    >
        <h1>Profile</h1>
    </div>
  );
};
  
export default Profile;
