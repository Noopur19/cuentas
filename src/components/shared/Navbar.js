import React, { useState } from 'react';
import { NavbarTitle, Nav } from './Navbar.styled';
import backIcon from '../../images/backIcon.svg';
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import NavbarCard from './NavbarCard';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {  getTransactionStatus } from 'utils/helpers';

import Modal from 'components/shared/Modal';
import { postCancelTransaction } from 'middleware/transactionDetails';
const Navbar = (props)  => {
    const { showProgressBar, activeCard } = props
    const [ isOpen, setIsOpen ] = useState(false);
    const dispatch = useDispatch()
    const enquiry = useSelector((state) => state.transactionHistory?.enquiryDetails)
    const invoice = useSelector((state) => state.transactionHistory.invoiceDetails)
    const receiver = invoice && JSON.parse(invoice?.additional_properties.receiver.value)
    const sender = invoice && JSON.parse(invoice?.additional_properties.sender.value)
    const mtcn = invoice?.additional_properties.mtcn.value
    const { t } = useTranslation()
    const history = useHistory();

    const stepData =  useSelector((state) => state.theme.stepData)

    const handleBack = () => {
        history.goBack()
    }
    const getActiveBar = (value) => {
        return stepData?.step >= value && 'active'
    }

    const toggleModal = () => {
        getTransactionStatus(enquiry?.transaction_status) === `${ t('CANCEL_TEXT') }` ?
            setIsOpen(!isOpen) : setIsOpen(isOpen) ;
    }

    const cancelTransData = {
        'amount': invoice?.additional_properties?.amount?.value || null,
        'invoiceId': invoice?.id || null,
        'transactionId': invoice?.additional_properties?.transaction_id?.value || null,
        'mtcn': invoice?.additional_properties?.mtcn?.value || null,
    }

    const onCancelHandler = () => {
        dispatch(postCancelTransaction(cancelTransData, receiver, sender, mtcn))
        toggleModal()
    }

    const renderModal = () => {
        return (
            <Modal
                show={ isOpen }
                handleClose={ () => toggleModal() }
                handleCancel={ () => onCancelHandler() }
                leftButtonText={ t('CLOSE_TEXT') }
                rightButtonText={ t('CANCEL_TRANSFER') }
            >
                <h3>{t('STATUS_PENDING')}</h3>
                <h4>(MTCN){invoice?.additional_properties?.mtcn.value}</h4>
                <h5>{t('CANCEL_CONFIRMATION')}</h5>
            </Modal>
        )
    }
    return (
        <>
            <Nav>
                <div className="top-header">
                    <a href="#" onClick={ handleBack } ><img src={ backIcon } alt="back"/> </a>
                    <NavbarTitle className="main-title">
                        <h3>{t('SEND_MONEY_WITH_CUENTAS')}
                            <i>{t('POWERED_BY_WESTERN_UNION')}</i>
                        </h3>
                        <div className="card-top-header">
                            <h5>Transactions Details</h5>
                        </div>
                    </NavbarTitle>
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
                    {activeCard() && <NavbarCard toggleModal={ toggleModal } />}
                </div>
                <div className="header-progress">
                    <h5>{t('NOT_A_RECEIPT')}</h5>
                </div>
                <div className="success-head">
                    <h3>{t('SUCCESS')}</h3>
                </div>
            </Nav>
            {renderModal()}
        </>
    )
}
Navbar.propTypes = {
    showProgressBar: PropTypes.func,
    activeCard: PropTypes.func,
    transactions: PropTypes.object
}

export default withRouter(Navbar);