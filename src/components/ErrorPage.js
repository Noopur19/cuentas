import React,{ useState } from 'react'
import Modal from 'components/shared/Modal';
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
    const { t } = useTranslation()
    const [ isOpen, setIsOpen ] = useState(true);

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return(
        <Modal
            show={ isOpen }
            handleCancel={ () => toggleModal() }
            rightButtonText={ t('CLOSE_TEXT') }
        >
            <h3>{t('OOPS_ERROR')}</h3>
            <h4>{t('VISIT_APP_STORE')}</h4>
        </Modal>
    )
}

export default ErrorPage