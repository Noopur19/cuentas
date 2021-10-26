import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { renderSelectField } from 'utils/formUtils';
import { Card } from '../../shared/Footer.styled'
import Button from 'components/shared/Button.styled'
import Footer from 'components/shared/Footer'
import { getParseHtmlArticle } from 'utils/helpers'
import { transactionDetailsValidate as validate } from 'utils/validates'
const DelievryTypeForm = (props) => {
    console.log(props)
    const { handleSubmit, initialize , submitData } = props;
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.form.receiver_details)
    const transferDetails = useSelector((state) => state.receiver.transferDetails)
    console.log(userInfo, transferDetails,dispatch,initialize , submitData )

    const saveData = (values) => {
        console.log(values)
    }
    const getStatesOptions = () => {
        const serviceOptions = transferDetails.service_options.service_option
        return serviceOptions.map((item) => ({ value: JSON.stringify(item.wu_product), label: item.wu_product.name }))
    }
    return (
        <Card>

            <div>
                <h5>Select a Delivery Type</h5>
                <form onSubmit={ handleSubmit(saveData) } >

                    <Field
                        name="deliveryType"
                        placeholder="deliveryType"
                        options= { getStatesOptions() }
                        component={ renderSelectField }
                    />

                    {getParseHtmlArticle('en_wu_111')}
                    <Footer>
                        <Button >Back</Button>
                        <Button outlined type='submit'>Continue</Button>
                    </Footer>
                </form>
            </div>
        </Card>

    )
}

export default reduxForm({
    form: 'receiver_details', // a unique identifier for this form
    destroyOnUnmount: false,
    validate

})(DelievryTypeForm);