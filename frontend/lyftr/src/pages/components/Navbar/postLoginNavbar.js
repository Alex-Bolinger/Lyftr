import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu
} from './NavbarElements';

const PostNavbar = () => {
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <h1 style={{ paddingLeft: "20px", paddingRight: "20px" }}>Lyftr</h1>
                    <NavLink to="/Home">Home</NavLink>
                    <NavLink to="/Profile">Profile</NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default PostNavbar;