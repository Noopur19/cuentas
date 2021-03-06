import React from 'react';
import Button from 'components/shared/Button.styled'
import PropTypes from 'prop-types';
import ModalWrapper from './Modal.styled'
import { STATIC_URLS } from 'constants/app'
import googleImage from 'images/googleplay.png'
import iosImage from 'images/ios.png'

const Modal = (props) => {
    const {
        hideRightButton,
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
                            <a href={ STATIC_URLS.APP_ANDROID_URL }><img className='my-2' src={ googleImage } /></a>
                            <a href={ STATIC_URLS.APP_IOS_URL }><img className='my-2 ml-2' src={ iosImage } /></a>
                        </> :
                        <Button className="btn-close" onClick={ handleClose } > {leftButtonText }</Button> }
                    {!hideRightButton && <Button className="btn-close" onClick={ handleCancel } outlined type='submit'>{rightButtonText}</Button>}
                </div>
            </div>
        </ModalWrapper>
    );
};
Modal.propTypes = {
    hideRightButton: PropTypes.bool,
    icon: PropTypes.bool,
    handleClose: PropTypes.func,
    handleCancel: PropTypes.func,
    show: PropTypes.bool,
    children: PropTypes.object,
    leftButtonText: PropTypes.string,
    rightButtonText: PropTypes.string
};
export default Modal;