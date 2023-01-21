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
                        <h1 style={{ paddingLeft: "20px", paddingRight: "20px" }}>Lyftr</h1>
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
                        <h1 style={{ paddingLeft: "20px", paddingRight: "20px" }}>Lyftr</h1>
                        <NavLink to="Home">Home</NavLink>
                        <NavLink to="Profile">Profile</NavLink>
                    </NavMenu>
                </Nav>
            </>
        )
    }
}

export default Navbar;