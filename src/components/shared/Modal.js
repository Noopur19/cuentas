import React from 'react';
import Button from 'components/shared/Button.styled'
import PropTypes from 'prop-types';
import ModalWrapper from './Modal.styled'
import { STATIC_URLS } from 'constants/app'
import { getCloseText , getCancelTransfer } from 'utils/helpers'
import googleImage from 'images/googleplay.png'
import iosImage from 'images/ios.png'

const Modal = (props) => {
    const {
        handleClose,
        icon,
        handleCancel,
        show,
        children,
        leftButtonText,
        rightButtonText
    } = props

    const showHideClassName = show ? 'modal d-block' : 'modal d-none';
    return (
        <ModalWrapper className={ showHideClassName }>
            <div className="modal-wrap">
                <div className="modal-container">
                    {children}
                    {icon ?
                        <>
                            <a  className='my-2' href={ STATIC_URLS.APP_ANDROID_URL }><img src={ googleImage } /></a>
                            <a className='my-2' href={ STATIC_URLS.APP_IOS_URL }><img src={ iosImage } /></a>
                        </> :
                        <Button onClick={ handleClose } > {leftButtonText || getCloseText() }</Button> }
                    <Button onClick={ handleCancel } outlined type='submit'>{rightButtonText || getCancelTransfer()}</Button>
                </div>
            </div>
        </ModalWrapper>
    );
};
Modal.propTypes = {
    icon: PropTypes.bool,
    handleClose: PropTypes.func,
    handleCancel: PropTypes.func,
    show: PropTypes.bool,
    children: PropTypes.object,
    leftButtonText: PropTypes.string,
    rightButtonText: PropTypes.string
};
export default Modal;