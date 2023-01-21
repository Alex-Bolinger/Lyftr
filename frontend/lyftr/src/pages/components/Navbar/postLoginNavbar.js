import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu
} from './NavbarElements';
import { useLocation } from 'react-router-dom';

const PostNavbar = () => {
    
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
<<<<<<< Updated upstream
                    <h1 style={{ paddingLeft: "20px", paddingRight: "20px" }}>Lyftr</h1>
                    <NavLink to="/Home">Home</NavLink>
                    <NavLink to="/Profile">Profile</NavLink>
=======
                    <NavLink to={{pathname: "/Home", state: useLocation().state}}>Home</NavLink>
                    <NavLink to={{pathname: "/Profile", state: useLocation().state}}>Profile</NavLink>
>>>>>>> Stashed changes
                </NavMenu>
            </Nav>
        </>
    )
}

export default PostNavbar;