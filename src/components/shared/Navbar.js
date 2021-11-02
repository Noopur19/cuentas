import * as React from 'react';
import { NavbarTitle, Nav } from './Navbar.styled';
import backIcon from '../../images/backIcon.svg'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import NavbarCard from './NavbarCard';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = (props)  => {
    const { showProgressBar, activeCard } = props
    const { t } = useTranslation()
    const history = useHistory();

    const stepData =  useSelector((state) => state.theme.stepData)

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
                <NavbarTitle>{t('SEND_MONEY_WITH_CUENTAS')}
                    <i>{t('POWERED_BY_WESTERN_UNION')}</i>
                </NavbarTitle>
                <div></div>
                { showProgressBar() &&
                <div className="progress-wrapper">
                    <h3>{stepData?.title}</h3>
                    <ul className="progressbar">
                        <li className={ getActiveBar(1) }>{t('PROGRESS_TEXT')}</li>
                        <li className={ getActiveBar(2) }></li>
                        <li className={ getActiveBar(3) }></li>
                        <li className={ getActiveBar(4) }></li>
                    </ul>
                </div>
                }
                {activeCard() && <NavbarCard />}
            </div>
        </Nav>
    )
}
Navbar.propTypes = {
    showProgressBar: PropTypes.func,
    activeCard: PropTypes.func
}

export default withRouter(Navbar);