import * as React from 'react';
import { NavbarTitle, Nav } from './Navbar.styled';
import backIcon from '../../images/backIcon.svg'

const Navbar = () => {
    return (
        <div>
            <Nav>
                <a href="#"><img src={ backIcon } alt="back"/> </a>
                <NavbarTitle>Send money with cuentas
                    <i>Powered by Western Union</i>
                </NavbarTitle>
                <div></div>
            </Nav>
        </div>
    )
}

export default Navbar;