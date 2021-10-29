import React from 'react';
import Button from 'components/shared/Button.styled'
import PropTypes from 'prop-types';
import ModalWrapper from './Modal.styled'

const Modal = ({ handleClose, handleCancel, show, children }) => {
    const showHideClassName = show ? 'modal d-block' : 'modal d-none';

    return (
        <ModalWrapper className={ showHideClassName }>
            <div className="modal-wrap">
                <div className="modal-container">
                    {children}
                    <Button onClick={ handleClose }>Close</Button>
                    <Button  onClick={ handleCancel } outlined type='submit'>Cancel Transaction</Button>
                </div>
            </div>
        </ModalWrapper>
    );
};
Modal.propTypes = {
    handleClose: PropTypes.func,
    handleCancel: PropTypes.func,
    show: PropTypes.bool,
    children: PropTypes.children
};
export default Modal;