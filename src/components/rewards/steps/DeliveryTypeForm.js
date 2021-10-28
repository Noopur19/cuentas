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

const DelievryTypeForm = (props) => {
    const { handleSubmit, initialize , prevPage } = props;
    const dispatch = useDispatch()
    const formValues = useSelector((state) => state.form.receiver_details)
    const incomeDetail = useSelector((state) => state.user.incomeDetail)
    const transferDetails = useSelector((state) => state.receiver.transferDetails)

    useEffect(() =>{
        dispatch({
            type: GET_STEP_PROGRESSBAR,
            data: { title: 'Delivery Type', step: 3 }
        })
        const serviceOptions = transferDetails.service_options.service_option
        const obj = _.merge(formValues.values, { deliveryType: JSON.stringify(serviceOptions[ 0 ]) })
        initialize(obj)
    },[])

    const saveData = (values) => {
        dispatch(postDeliveryData(values,incomeDetail))
    }
    const getServiceOptions = () => {
        const serviceOptions = transferDetails.service_options.service_option
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
        <Card>

            <div>
                <h5>Select a Delivery Type</h5>
                <form onSubmit={ handleSubmit(saveData) } >

                    <Field
                        name="deliveryType"
                        placeholder="deliveryType"
                        selectedOption={ { value: formValues?.values?.deliveryType, label: formValues?.values?.deliveryType && JSON.parse(formValues?.values?.deliveryType).wu_product.name } }
                        options= { getServiceOptions() }
                        component={ renderSelectField }
                    />
                    { getFeesData(formValues.values) }

                    {getParseHtmlArticle('en_wu_111')}
                    <Footer>
                        <Button onClick={ prevPage } >Back</Button>
                        <Button outlined type='submit'>Continue</Button>
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