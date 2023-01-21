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
                    <NavLink to={{pathname: "/Home", state: useLocation().state}}>Home</NavLink>
                    <NavLink to={{pathname: "/Profile", state: useLocation().state}}>Profile</NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default PostNavbar;