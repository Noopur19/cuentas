import * as React from 'react';
import { NavbarTitle, Nav } from './Navbar.styled';
import backIcon from '../../images/backIcon.svg'
import history from 'utils/history'
const Navbar = () => {

    const handleBack = () => {
        history.goBack()
    }
    return (
        <Nav>
            <div className="top-header">
                <a href="#" onClick={ handleBack } ><img src={ backIcon } alt="back"/> </a>
                <NavbarTitle>Send money with cuentas
                    <i>Powered by Western Union</i>
                </NavbarTitle>
                <div></div>
                <div className="progress-wrapper">
                    <h3>Receiver Details</h3>
                    <ul className="progressbar">
                        <li className="active">Progress</li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </Nav>
    )
}

export default Navbar;