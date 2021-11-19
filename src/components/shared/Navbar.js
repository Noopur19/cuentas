import React from 'react';
import { NavbarTitle, Nav } from './Navbar.styled';
import backIcon from '../../images/backIcon.svg';
import sentIcon from '../../images/sentIcon.svg';
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { postSendEmail } from 'middleware/transactionDetails';
import { navigateBackForApp } from 'utils/helpers'

const Navbar = (props)  => {
    const { showProgressBar , history } = props
    const step = useSelector((state) => state.theme.step)

    const dispatch = useDispatch()
    const invoice = useSelector((state) => state.transactionHistory.invoiceDetails)

    const { t } = useTranslation()

    const stepData =  useSelector((state) => state.theme.stepData)
    const onClickHandler = () => {
        dispatch(postSendEmail(invoice?.id))
    }
    const getCurrentPath = () => {
        return history.location.pathname
    }

    const handleBack = () => {
        const path = getCurrentPath()
        navigateBackForApp(path, dispatch,step)

    }
    const getActiveBar = (value) => {
        return stepData?.step >= value && 'active'
    }

    const transactionCard = () =>{
        // eslint-disable-next-line no-useless-escape
        return history?.location?.pathname?.match('/transaction-history')
    }

    return (
        <>
            <Nav>
                <div className="top-header">
                    <a href="#" onClick={ () => handleBack() } ><img src={ backIcon } alt="back"/> </a>
                    <NavbarTitle className="main-title">
                        { !transactionCard() && <h3>{t('SEND_MONEY_WITH_CUENTAS')}
                            <i>{t('POWERED_BY_WESTERN_UNION')}</i>
                        </h3> }
                        <div className="card-top-header">
                            <h5>Transactions Details</h5>
                        </div>
                        {transactionCard() &&  <div className="transaction-history">
                            <h3>MyWUHistory</h3>
                        </div>}
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
                </div>
                <div className="header-progress">
                    <h5>{t('NOT_A_RECEIPT')}</h5>
                </div>
                <div className="success-head">
                    <h3>{t('SUCCESS')}</h3>
                </div>
            </Nav>
        </>
    )
}
Navbar.propTypes = {
    showProgressBar: PropTypes.func,
    activeCard: PropTypes.func,
    transactions: PropTypes.object,
    history: PropTypes.history
}

export default withRouter(Navbar);