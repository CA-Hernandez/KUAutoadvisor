import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu
  } from './NavbarElements';
  

const Navbar = () => {
    return(
        <>
        <Nav>
            <NavLink to ='/'>
                <h1>KUAutoadvisor</h1>
            </NavLink>
            <Bars/>
            <NavMenu>
                <NavLink to ='/upload' activeStyle>
                    Upload
                </NavLink>
                <NavLink to ='/schedule' activeStyle>
                    Schedule
                </NavLink>
                <NavLink to ='/about' activeStyle>
                    About
                </NavLink>
            </NavMenu>
        </Nav>
        </>
    )
}

export default Navbar;