import * as React from 'react';
import { NavbarTitle, Nav } from './Navbar.styled';
import backIcon from '../../images/backIcon.svg';
import sentIcon from '../../images/sentIcon.svg';
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import NavbarCard from './NavbarCard';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { postSendEmail } from 'middleware/transactionDetails';

const Navbar = (props)  => {
    const { showProgressBar, activeCard } = props
    const { t } = useTranslation()
    const history = useHistory();

    const { transactions } = props;
    const stepData =  useSelector((state) => state.theme.stepData)
    const dispatch = useDispatch()
    const onClickHandler = () => {
        dispatch(postSendEmail(transactions.id))
    }

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
                <div className="blankIcon">
                    <a className="sentIcon" onClick={ () => onClickHandler() } href="#"><img src={ sentIcon } alt="back"/> </a>
                </div>
                { showProgressBar() &&
                <><div className="progress-wrapper">
                    <h3>{stepData?.title}</h3>
                    <ul className="progressbar">
                        <li className={ getActiveBar(1) }>{t('PROGRESS_TEXT')}</li>
                        <li className={ getActiveBar(2) }></li>
                        <li className={ getActiveBar(3) }></li>
                        <li className={ getActiveBar(4) }></li>
                    </ul>
                </div>
                </>
                }
                {activeCard() && <NavbarCard />}
            </div>
            <div className="header-progress">
                <h5>{t('NOT_A_RECEIPT')}</h5>
            </div>
            <div className="success-head">
                <h3>{t('SUCCESS')}</h3>
            </div>

        </Nav>
    )
}
Navbar.propTypes = {
    showProgressBar: PropTypes.func,
    activeCard: PropTypes.func,
    transactions: PropTypes.object
}

export default withRouter(Navbar);