import React from 'react'
import { useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { renderField } from 'utils/formUtils';

const TransactionDetailsForm = (props) => {
    console.log(props)
    const { handleSubmit, submitData } = props;
    const userInfo = useSelector((state) => state.form.receiver_details)

    return (
        <div>
            <h2>Transaction details</h2>
            <h5>Final Reciever</h5>
            <div>Full name {`${ userInfo.values.firstName || '' } ${ userInfo.values.middleName || '' } ${ userInfo.values.lastName || '' }` }</div>
            <div>Payout country {userInfo.values.country || ''}</div>
            <div>Payout city {userInfo.values.city || ''}</div>
            <div>Payout state {userInfo.values.state || ''}</div>

            <h5>Your account information</h5>
            <b>Current Balance: </b>

            <h5>Payout currency</h5>
            <form onSubmit={ handleSubmit(submitData) } >
                <label>
                    <Field
                        name="payoutCurrency"
                        type="radio"
                        component={ renderField }
                    />
                    Pesos
                </label>
                <label>
                    <Field
                        name="payoutCurrency"
                        type="radio"
                        component={ renderField }
                    />
                    US Dollar
                </label>

                <h5>Promotional Code</h5>
                <Field
                    name="promoCode"
                    type="text"
                    component={ renderField }
                />
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'transaction_details', // a unique identifier for this form
    destroyOnUnmount: false,

})(TransactionDetailsForm);