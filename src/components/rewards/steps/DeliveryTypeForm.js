import React,{ useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { renderSelectField } from 'utils/formUtils';
import { Card } from '../../shared/Footer.styled'
import Button from 'components/shared/Button.styled'
import Footer from 'components/shared/Footer'
import { getParseHtmlArticle } from 'utils/helpers'
import { GET_STEP_PROGRESSBAR } from 'constants/app'
import PropTypes from 'prop-types';
import { postDeliveryData } from 'middleware/receiver'
import _ from 'lodash'
import { transactionDetailsValidate as validate } from 'utils/validates'
import { FeeData } from './TransactionDetailsForm.styled'
import { useTranslation } from 'react-i18next';
import { locale  } from 'utils/helpers';
const DelievryTypeForm = (props) => {
    const { t } = useTranslation()
    const { handleSubmit, initialize ,submitData, prevPage } = props;
    const dispatch = useDispatch()
    const formValues = useSelector((state) => state.form.receiver_details)
    const incomeDetail = useSelector((state) => state.user.incomeDetail)
    const transferDetails = useSelector((state) => state.receiver.transferDetails)

    const getValidCode = deliveryTypeArray => {
        if (locale() === 'en') {
            return [ '000', '300' ];
        }
        var index = deliveryTypeArray.findIndex(item => {
            return item.wu_product.code === '400';
        });
        return index > -1 ? [ '400' ] : [ '000','300','500' ];
    };

    useEffect(() =>{
        dispatch({
            type: GET_STEP_PROGRESSBAR,
            data: { title: t('DELIVERY_TYPE'), step: 3 }
        })
        let serviceOptions = transferDetails.service_options.service_option
        const validCodes = getValidCode(serviceOptions)
        serviceOptions = serviceOptions.filter((item) => validCodes.includes(item.wu_product.code))
        const obj = _.merge(formValues.values, { deliveryType: JSON.stringify(serviceOptions[ 0 ]) })
        initialize(obj)
    },[])

    const saveData = (values) => {
        dispatch(postDeliveryData(values,incomeDetail,submitData))
    }

    const getServiceOptions = () => {
        let serviceOptions = transferDetails.service_options.service_option
        const validCodes = getValidCode(serviceOptions)
        serviceOptions = serviceOptions.filter((item) => validCodes.includes(item.wu_product.code))
        return serviceOptions.map((item) => ({ value: JSON.stringify(item), label: item.wu_product.name }))
    }
    const getFeesData = (values) => {
        const delieveryType = values.deliveryType && JSON.parse(values.deliveryType)
        const charges = delieveryType?.payment_details?.fees?.charges && parseFloat(delieveryType?.payment_details?.fees?.charges) / 100
        return <div>
            <span>{ delieveryType?.wu_product.name }  ${ parseFloat(charges).toFixed(2) }</span>
        </div>
    }

    return (
        <Card className="progress-card">

            <div>
                <h5>{t('SELECT_DELIVERY_TYPE')}</h5>
                <form onSubmit={ handleSubmit(saveData) } >

                    <Field
                        name="deliveryType"
                        placeholder="deliveryType"
                        selectedOption={ { value: formValues?.values?.deliveryType, label: formValues?.values?.deliveryType && JSON.parse(formValues?.values?.deliveryType).wu_product.name } }
                        options= { getServiceOptions() }
                        component={ renderSelectField }
                    />

                    <FeeData className="FeesData">
                        { getFeesData(formValues.values) }

                    </FeeData>

                    {getParseHtmlArticle('wu_111')}
                    <Footer>
                        <Button onClick={ prevPage } >{t('BACK')}</Button>
                        <Button outlined type='submit'>{t('CONTINUE')}</Button>
                    </Footer>
                </form>
            </div>
        </Card>

    )
}

DelievryTypeForm.propTypes = {
    handleSubmit: PropTypes.func,
    initialize: PropTypes.object,
    prevPage: PropTypes.func,
    submitData: PropTypes.func
};
export default reduxForm({
    form: 'receiver_details', // a unique identifier for this form
    destroyOnUnmount: false,
    validate

})(DelievryTypeForm);