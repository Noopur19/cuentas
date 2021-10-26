/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { renderField } from 'utils/formUtils';
import { postTransactionDetails } from 'middleware/receiver'
import { Card } from '../../shared/Footer.styled'
import _ from 'lodash'
import Button from 'components/shared/Button.styled'
import Footer from 'components/shared/Footer'
import BorderTitle from '../../shared/BorderTitle.styled'
import Transaction from './TransactionDetailsForm.styled'
import Vector from '../../../images/Vector.svg'
import CardFooter from '../../shared/CardFooter'

import { getParseHtmlArticle } from 'utils/helpers'
import { transactionDetailsValidate as validate } from 'utils/validates'
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
            amount: values.amountUSD && parseFloat(values.amountUSD),
            destCurrency: values.payoutCurrency || currencyChecked,
            destCountry: country?.currency && country?.currency[ 0 ].country_cd,
            promoCode: values?.promoCode
        }
        debugger
        dispatch(postTransactionDetails(data))
        submitData(data)
    }
    return (
        <Card>

            <Transaction className="transaction">
                <BorderTitle smallText>Reciever information </BorderTitle>
                <div className="d-flex justify-content-between">
                    <span>Full name</span>
                    <span> {`${ userInfo.values.firstName || '' } ${ userInfo.values.middleName || '' } ${ userInfo.values.lastName || '' }` }</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Payout country</span>
                    <span> {country?.country || ''}</span>
                </div>
                {formValues.city && <div>Payout city {formValues.city || ''}</div>}
                {formValues.state && <div>Payout state {formValues.state || ''}</div>}

                <BorderTitle smallText className="mt-4">Your account information</BorderTitle>
                <p className="text-center"><b>Current Balance: </b> </p>

                <BorderTitle smallText className="mt-4">Payout currency</BorderTitle>
                <form onSubmit={ handleSubmit(saveData) } >
                    { country?.currency && country?.currency.map((item, index) => {
                        return(
                            <div className="radio-wrapper">
                                <label key={ index }> { item.currency }</label>
                                <Field
                                    name="payoutCurrency"
                                    type="radio"
                                    handleChange={ handleChangeRadio }
                                    value={ item.currency_cd }
                                    checked={ currencyChecked === item.currency_cd }
                                    component={ renderField }
                                />
                            </div>
                        )
                    })}
                    <BorderTitle smallText className="mt-4">Amount to send</BorderTitle>
                    { (formValues?.payoutCurrency || currencyChecked) !== 'USD' ?
                        <>
                            <div className="converter d-flex justify-content-between">
                                <Field
                                    name="amountUSD"
                                    type="number"
                                    placeholder={ 'USD' }
                                    handleChange={ (value) => handleChangeAmountCalculation(value,'USD') }
                                    component={ renderField }
                                />
                                <img src={ Vector } alt="back"/>
                                <Field
                                    name="amount"
                                    type="number"
                                    placeholder={ currencyChecked }
                                    handleChange={ (value) => handleChangeAmountCalculation(value,'other') }
                                    component={ renderField }
                                />

                            </div>
                            <p className="text-center"><b>Exchange Rate: 1 USD = {transferDetails?.service_options?.service_option[ 0 ]?.payment_details.exchange_rate  } { currencyChecked }</b></p>
                        </> :  <Field
                            name="amountUSD"
                            type="number"
                            placeholder={ currencyChecked }
                            component={ renderField }
                        />

                    }

                    <BorderTitle smallText className="mt-4">Promotional Code</BorderTitle>
                    <Field
                        name="promoCode"
                        type="text"
                        component={ renderField }
                    />
                    <CardFooter></CardFooter>
                    {getParseHtmlArticle('en_wu_109')}
                    {getParseHtmlArticle('en_wu_115')}
                    {getParseHtmlArticle('en_wu_111')}
                    {getParseHtmlArticle('en_wu_114')}
                    <Footer>
                        <Button >Back</Button>
                        <Button outlined type='submit'>Continue</Button>
                    </Footer>
                </form>
            </Transaction>
        </Card>

    )
}

export default reduxForm({
    form: 'receiver_details', // a unique identifier for this form
    destroyOnUnmount: false,
    validate

})(TransactionDetailsForm);