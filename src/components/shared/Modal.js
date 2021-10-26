import React from 'react';
import Button from 'components/shared/Button.styled'

const Modal = ({ handleClose, handleCancel, show, children }) => {
    const showHideClassName = show ? 'modal d-block' : 'modal d-none';

    return (
        <div className={ showHideClassName }>
            <div className="modal-container">
                {children}
                <Button onClick={ handleClose }>Close</Button>
                <Button  onClick={ handleCancel } outlined type='submit'>Cancel Transaction</Button>
            </div>
        </div>
    );
};

export default Modal;