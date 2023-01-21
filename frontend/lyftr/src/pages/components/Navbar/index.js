import React from 'react';
import {
  Nav,
  NavBT,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

var loggedIn = false;

const Navbar = () => {
    if (!loggedIn) {
        return (
            <>
                <NavBT>
                    <Bars />
                    <NavMenu>
                        <NavBtn>
                            <NavBtnLink to='/login'>Login</NavBtnLink>
                        </NavBtn>
                        <NavBtn>
                            <NavBtnLink to='/SignUp'>SignUp</NavBtnLink>
                        </NavBtn>
                    </NavMenu>
                </NavBT>
            </>
        )
    } else {
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
}

export default Navbar;