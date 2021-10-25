import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { renderField } from 'utils/formUtils';
import { postTransactionDetails } from 'middleware/receiver'
import { Card } from '../../shared/Footer.styled'
import _ from 'lodash'
import Button from 'components/shared/Button.styled'
import Footer from 'components/shared/Footer'

const TransactionDetailsForm = (props) => {
    console.log(props)
    const { handleSubmit, initialize , submitData } = props;
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.form.receiver_details)

    const transferDetails = useSelector((state) => state.receiver.transferDetails)
    const formValues = userInfo?.values || {}
    const country  = formValues.country && JSON.parse(formValues.country)
    const [ currencyChecked , setCurrencyChecked ] = useState(country?.currency && country?.currency[ 0 ].currency_cd)

    const isUSD = () => {
        return country?.currency && country?.currency[ 0 ].currency_cd === 'USD'
    }

    const transactionDetails = (currencyCd) => {
        const data = {
            transactionType: isUSD(country) ? 'WMN' : 'WMF',
            amount: 1000,
            destCurrency: currencyCd || country?.currency && country?.currency[ 0 ].currency_cd,
            destCountry: country?.currency && country?.currency[ 0 ].country_cd
        }
        if(formValues?.state) data[ 'destState' ] = formValues?.state
        if(formValues?.city) data[ 'destCity' ] = formValues?.city
        dispatch(postTransactionDetails(data))
    }
    useEffect(() => {
        transactionDetails()
    },[])

    const handleChangeRadio = ( value ) => {
        setCurrencyChecked(value)
        transactionDetails(value)
        const obj = _.merge(formValues,{
            amount: null,
            amountUSD: null,
            payoutCurrency: value
        })
        initialize(obj)
    }

    const handleChangeAmountCalculation = (value,type) => {
        const serviceOption = transferDetails?.service_options?.service_option[ 0 ]
        const exchangeRate = serviceOption?.payment_details.exchange_rate && parseFloat(serviceOption?.payment_details.exchange_rate)
        if(type === 'USD'){
            const obj = _.merge(formValues,{
                amount: exchangeRate*parseFloat(value)
            })
            initialize(obj)
        }else{
            const obj = _.merge(formValues,{
                amountUSD: parseFloat(value)/ exchangeRate
            })
            initialize(obj)
        }
    }

    const saveData = (values) => {
        const data = {
            transactionType: values.payoutCurrency === 'USD' ? 'WMN' : 'WMF',
            amount: values.amount && parseFloat(values.amount),
            destCurrency: values.payoutCurrency,
            destCountry: country?.currency && country?.currency[ 0 ].country_cd,
            promoCode: values?.promoCode
        }
        dispatch(postTransactionDetails(data))
        submitData(data)
    }
    return (
        <Card>

            <div>
                <h2>Transaction details</h2>
                <h5>Reciever information </h5>
                <div>Full name {`${ userInfo.values.firstName || '' } ${ userInfo.values.middleName || '' } ${ userInfo.values.lastName || '' }` }</div>
                <div>Payout country {country?.country || ''}</div>
                {formValues.city && <div>Payout city {formValues.city || ''}</div>}
                {formValues.state && <div>Payout state {formValues.state || ''}</div>}

                <h5>Your account information</h5>
                <b>Current Balance: </b>

                <h5>Payout currency</h5>
                <form onSubmit={ handleSubmit(saveData) } >
                    { country?.currency && country?.currency.map((item, index) => {
                        return( <label key={ index }>
                            <Field
                                name="payoutCurrency"
                                type="radio"
                                handleChange={ handleChangeRadio }
                                value={ item.currency_cd }
                                checked={ currencyChecked === item.currency_cd }

                                component={ renderField }
                            />
                            { item.currency }
                        </label>
                        )
                    })}
                    <h5>Amount to send</h5>
                    { (formValues?.payoutCurrency || currencyChecked) !== 'USD' ?
                        <>
                            <Field
                                name="amountUSD"
                                type="number"
                                placeholder={ 'USD' }
                                handleChange={ (value) => handleChangeAmountCalculation(value,'USD') }
                                component={ renderField }
                            />to
                            <Field
                                name="amount"
                                type="number"
                                placeholder={ currencyChecked }
                                handleChange={ (value) => handleChangeAmountCalculation(value,'other') }
                                component={ renderField }
                            />
                            <p>Exchange Rate: 1 USD = {transferDetails?.service_options?.service_option[ 0 ]?.payment_details.exchange_rate  } { currencyChecked } </p>
                        </> :  <Field
                            name="amount"
                            type="number"
                            placeholder={ currencyChecked }
                            component={ renderField }
                        />

                    }

                    <h5>Promotional Code</h5>
                    <Field
                        name="promoCode"
                        type="text"
                        component={ renderField }
                    />
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

})(TransactionDetailsForm);