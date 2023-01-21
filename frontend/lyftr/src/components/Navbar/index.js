import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to='/'>
                        Home
                    </NavLink>
                    <NavLink to='Profile'>
                        Profile
                    </NavLink>
                </NavMenu>
                <NavMenu>
                    <NavBtn>
                        <NavBtnLink to='/login'>Login</NavBtnLink>
                    </NavBtn>
                    <NavBtn>
                        <NavBtnLink to='/Sign Up'>SignUp</NavBtnLink>
                    </NavBtn>
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar;