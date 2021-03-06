/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { renderField , renderNumberField } from 'utils/formUtils';
import { postTransactionDetails, postTransactionDetailsSubmission } from 'middleware/receiver'
import { Card } from '../../shared/Footer.styled'
import _ from 'lodash'
import Button from 'components/shared/Button.styled'
import Footer from 'components/shared/Footer'
import BorderTitle from '../../shared/BorderTitle.styled'
import { Transaction } from './TransactionDetailsForm.styled'
import Vector from '../../../images/Vector.svg'
import CardFooter from '../../shared/CardFooter'
import PropTypes from 'prop-types';
import { GET_STEP_PROGRESSBAR } from 'constants/app'
import { change } from 'redux-form'
import {  getParseHtmlArticle } from 'utils/helpers'
import { transactionDetailsValidate as validate } from 'utils/validates'
import { useTranslation } from 'react-i18next';
import { getStateCd, getStateName, replaceNaN, onlyNumberNormalization } from 'utils/helpers'
import { getTotalAmount, getTrasactionTypeOnHandle } from 'utils/helpers'
const TransactionDetailsForm = (props) => {
    const { t } = useTranslation()
    const { handleSubmit, initialize ,prevPage, submitData } = props;
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.form.receiver_details)

    const transferDetails = useSelector((state) => state.receiver.transferDetails)
    const accountDetail = useSelector((state) => state.user.accountDetail)
    const availBail = accountDetail?.spendingAccount?.availableBalance

    const formValues = userInfo?.values || {}
    const country  = formValues.country && JSON.parse(formValues.country)
    const [ currencyChecked , setCurrencyChecked ] = useState( formValues?.payoutCurrency || country?.currency && country?.currency[ 0 ].currency_cd)

    const transactionDetails = (currencyCd) => {
        const data = {
            transactionType: 'WMN',
            amount: 1000,
            destCurrency: currencyCd || country?.currency && country?.currency[ 0 ].currency_cd,
            destCountry: country?.currency && country?.currency[ 0 ].country_cd
        }
        if(formValues?.state) data[ 'destState' ] = formValues?.state && getStateCd(formValues?.state)
        if(formValues?.city) data[ 'destCity' ] = formValues?.city
        dispatch(postTransactionDetails(data,null,t))
    }
    useEffect(() => {
        transactionDetails()
        dispatch({
            type: GET_STEP_PROGRESSBAR,
            data: { title: t('TRANSFER_DETAL'), step: 2 }
        })
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
            let amountData = exchangeRate*parseFloat(value)
            amountData = amountData && parseFloat(amountData.toFixed(4))
            const obj = _.merge(formValues,{
                amount:  replaceNaN(parseFloat(amountData).toFixed(4)),
                amountLastHandle: 'left'
            })
            initialize(obj)
        }else{
            let amountData = parseFloat(value)/ exchangeRate
            amountData = amountData && parseFloat(amountData.toFixed(4))
            const obj = _.merge(formValues,{
                amountUSD: replaceNaN(parseFloat(amountData).toFixed(4)),
                amountLastHandle: 'right'
            })
            initialize(obj)
        }
    }

    const saveData = (values) => {
        const data = {
            transactionType: getTrasactionTypeOnHandle(values.amountLastHandle),
            amount:  getTrasactionTypeOnHandle(values.amountLastHandle) === 'WMN' ? values.amountUSD && (parseFloat(values.amountUSD)*100) : values.amount && (parseFloat(values.amount)*100),
            destCurrency: values.payoutCurrency || currencyChecked,
            destCountry: country?.currency && country?.currency[ 0 ].country_cd,
            promoCode: values?.promoCode
        }
        if(formValues?.state) data[ 'destState' ] = formValues?.state && getStateCd(formValues?.state)
        if(formValues?.city) data[ 'destCity' ] = formValues?.city
        dispatch(postTransactionDetailsSubmission(data,submitData,t, availBail,  getTotalAmount ))
    }
    const handleChangeUSD = () => {
        dispatch(change('amountLastHandle','left'))
    }

    const getCurrencyCd = (obj) => {
        const currencyCd = obj.currency_cd
        return currencyCd && `(${ currencyCd })`
    }
    return (
        <Card className="progress-card">

            <Transaction className="transaction">
                <BorderTitle smallText><h3>{t('RECEIVER_INFO')}
                    <span className="underline"></span></h3>
                </BorderTitle>
                <div className="d-flex justify-content-between pb-2 r-info">
                    <span>{t('FULL_NAME')}</span>
                    <span className="text-right"><b>
                        {`${ userInfo?.values?.firstName || '' }
                        ${ userInfo?.values?.middleName || '' }
                        ${ userInfo?.values?.lastName || '' }
                        ${ userInfo?.values?.givenName || '' }
                        ${ userInfo?.values?.maternalName || '' }
                        ${ userInfo?.values?.paternalName || '' }
                        ` }</b>
                    </span>
                </div>
                <div className="d-flex justify-content-between pb-2 r-info">
                    <span>{t('PAYOUT_COUNTRY')}</span>
                    <span className="text-right"><b> {country?.country || ''}</b></span>
                </div>
                {formValues.state && <div className="d-flex justify-content-between pb-2 r-info">
                    <span>{t('PAYOUT_STATE')}</span>
                    <span className="text-right"><b>{formValues.state && getStateName(formValues.state) || ''}</b></span>
                </div>}
                {formValues.city && <div className="d-flex justify-content-between pb-2 r-info">
                    <span>{t('PAYOUT_CITY')}</span>
                    <span className="text-right"><b> {formValues.city || ''} </b></span>
                </div>}

                <BorderTitle smallText className="mt-4"><h3>{t('YOUR_ACCOUNT_INFO')}
                    <span className="underline"></span></h3>
                </BorderTitle>
                <p className="text-center"><b>{t('CURRENT_BALANCE')} ${ availBail }</b> </p>

                <BorderTitle smallText className="mt-4"><h3>{t('PAYOUT_CURRENCY')}
                    <span className="underline"></span></h3>
                </BorderTitle>
                <form onSubmit={ handleSubmit(saveData) } >
                    { country?.currency && country?.currency.map((item, index) => {
                        return(
                            <div className="radio-wrapper">
                                <label key={ index }> { item.currency } { getCurrencyCd(item) }</label>
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
                    <BorderTitle smallText className="mt-4"><h3>{t('AMOUNT2SEND')}
                        <span className="underline"></span></h3>
                    </BorderTitle>
                    { (formValues?.payoutCurrency || currencyChecked) !== 'USD' ?
                        <>
                            <div className="converter d-flex justify-content-between pb-2 r-info">
                                <Field
                                    name="amountUSD"
                                    fixed={ 2 }
                                    placeholder={ '(USD)' }
                                    handleChange={ (value) => handleChangeAmountCalculation(value,'USD') }
                                    component={ renderNumberField }
                                    normalize={ onlyNumberNormalization }
                                    inputMode="decimal"
                                />

                                <img src={ Vector } alt="back"/>
                                <Field
                                    name="amount"
                                    fixed={ 2 }
                                    placeholder={ currencyChecked }
                                    handleChange={ (value) => handleChangeAmountCalculation(value,'other') }
                                    component={ renderNumberField }
                                    normalize={ onlyNumberNormalization }
                                    inputMode="decimal"
                                />

                            </div>
                            <p className="text-center"><b>{t('EXCHANGE_RATE')}: 1 USD = {transferDetails?.service_options?.service_option[ 0 ]?.payment_details.exchange_rate  } { currencyChecked }</b></p>
                        </> :
                        <Field
                            name="amountUSD"
                            fixed={ 2 }
                            placeholder={ currencyChecked }
                            handleChange={ () => handleChangeUSD('USD') }
                            component={ renderNumberField }
                            normalize={ onlyNumberNormalization }
                            inputMode="decimal"
                        />

                    }

                    <BorderTitle smallText className="mt-4"><h3>{t('PROMO_CODE')}
                        <span className="underline"></span></h3>
                    </BorderTitle>
                    <Field
                        name="promoCode"
                        type="text"
                        component={ renderField }
                        placeholder="Promotional code"
                    />
                    {getParseHtmlArticle('wu_109')}
                    {getParseHtmlArticle('wu_115')}
                    {getParseHtmlArticle('wu_111')}
                    {getParseHtmlArticle('wu_114')}
                    <CardFooter></CardFooter>
                    <Footer>
                        <Button onClick={ prevPage }>{t('BACK')}</Button>
                        <Button outlined type='submit'>{t('CONTINUE')}</Button>
                    </Footer>
                </form>
            </Transaction>
        </Card>

    )
}
TransactionDetailsForm.propTypes = {
    handleSubmit: PropTypes.func,
    initialize: PropTypes.object,
    prevPage: PropTypes.func,
    submitData: PropTypes.func
};
export default reduxForm({
    form: 'receiver_details', // a unique identifier for this form
    destroyOnUnmount: false,
    validate

})(TransactionDetailsForm);