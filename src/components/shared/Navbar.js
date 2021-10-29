import * as React from 'react';
import { NavbarTitle, Nav, HeaderCard } from './Navbar.styled';
import backIcon from '../../images/backIcon.svg'
import history from 'utils/history'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import historyIcon from '../../images/historyIcon.png';

const Navbar = (props)  => {
    const { showProgressBar } = props
    const stepData =  useSelector((state) => state.theme.stepData)
    console.log(stepData)

    const handleBack = () => {
        history.goBack()
    }
    const getActiveBar = (value) => {
        return stepData?.step >= value && 'active'
    }
    return (
        <Nav>
            <div className="top-header">
                <a href="#" onClick={ handleBack } ><img src={ backIcon } alt="back"/> </a>
                <NavbarTitle>Send money with cuentas
                    <i>Powered by Western Union</i>
                </NavbarTitle>
                <div></div>
                { showProgressBar() &&
                <div className="progress-wrapper">
                    <h3>{stepData?.title}</h3>
                    <ul className="progressbar">
                        <li className={ getActiveBar(1) }>Progress</li>
                        <li className={ getActiveBar(2) }></li>
                        <li className={ getActiveBar(3) }></li>
                        <li className={ getActiveBar(4) }></li>
                    </ul>
                </div>
                }

                <HeaderCard className="header-card">
                    <div className="amount-paid">
                        <h2>Amount Paid</h2>
                        <span>$6</span>
                        <p>Cancelar</p>
                    </div>
                    <div className="amount-img">
                        <img className="img-fluid" src={ historyIcon } alt="history-icon"/>
                        <p> 26 October, 2021 | 08:37 </p>
                    </div>
                </HeaderCard>

            </div>
        </Nav>
    )
}
Navbar.propTypes = {
    showProgressBar: PropTypes.func
}

export default withRouter(Navbar);