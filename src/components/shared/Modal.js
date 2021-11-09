import React from 'react';
import Button from 'components/shared/Button.styled'
import PropTypes from 'prop-types';
import ModalWrapper from './Modal.styled'
import { useTranslation } from 'react-i18next';

const Modal = ({ handleClose, handleCancel, show, children }) => {
    const { t } = useTranslation();
    const showHideClassName = show ? 'modal d-block' : 'modal d-none';

    return (
        <ModalWrapper className={ showHideClassName }>
            <div className="modal-wrap">
                <div className="modal-container">
                    {children}
                    <Button onClick={ handleClose }>{t('CLOSE_TEXT')}</Button>
                    <Button  onClick={ handleCancel } outlined type='submit'>{t('CANCEL_TRANSFER')}</Button>
                </div>
            </div>
        </ModalWrapper>
    );
};
Modal.propTypes = {
    handleClose: PropTypes.func,
    handleCancel: PropTypes.func,
    show: PropTypes.bool,
    children: PropTypes.object
};
export default Modal;