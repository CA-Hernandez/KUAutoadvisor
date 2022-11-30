import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavbarElements';
  

const Navbar = () => {
    return(
        <>
        <Nav>
            <NavLink to ='/'>
            <img src={require('../images/logo.svg')} alt='logo' />
                <h1>KUAutoadvisor</h1>
            </NavLink>
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