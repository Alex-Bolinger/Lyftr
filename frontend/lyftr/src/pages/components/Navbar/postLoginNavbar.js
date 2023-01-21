import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const PostNavbar = () => {
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="Home">Home</NavLink>
                    <NavLink to="Profile">Profile</NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default PostNavbar;