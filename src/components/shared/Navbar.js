import * as React from 'react';
import { NavbarTitle, Nav } from './Navbar.styled';
import backIcon from '../../images/backIcon.svg'

const Navbar = () => {
    return (
        <div>
            <Nav>
                <img src={ backIcon } alt="back"/>
                <NavbarTitle>Send money with cuentas
                    <i>Powered by Western Union</i>
                </NavbarTitle>
            </Nav>
        </div>
    )
}

export default Navbar;