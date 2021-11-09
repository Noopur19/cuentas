import { SubmissionError } from 'redux-form'
import {  getLocalByTitle } from 'utils/helpers'
export const rewardNumberValidation = values => {
    const errors = {};
    if (values.WUNumber && values.WUNumber.length < 9 ) {
        errors.WUNumber = getLocalByTitle('ENTER_VALID_NUMBER');
    }
    return errors;
}
export const receiverFormValidate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = getLocalByTitle('FIRST_NAME')
    }
    if (!values.lastName) {
        errors.lastName = getLocalByTitle('LAST_NAME');
    }
    if(values.email && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))){
        errors.email = getLocalByTitle('CHECK_MAIL_LENGTH');
    }
    if (!values.country) {
        errors.country = getLocalByTitle('COUNTRY_ERROR');
    }
    return errors;
}
const throwError = (type,error) => {
    throw new SubmissionError({
        [ type ]: error,
        _error: error
    })
}
export const receiverFormSubmissionValidate = (values, states) => {
    if (states.length > 0 && states[ 0 ]?.city ) {
        if (!values.state) {
            throwError( 'state',getLocalByTitle('STATE_ERROR'))
        }
        if (!values.city) {
            throwError( 'city',getLocalByTitle('CITY_ERROR'))
        }
    }
    return true;
}
export const transactionDetailsValidate = (values) => {
    const errors = {};
    if (!values.amount) {
        errors.amount = getLocalByTitle('PLEASE_ENTER_AMOUNT');
    }
    if (!values.amountUSD) {
        errors.amountUSD = getLocalByTitle('PLEASE_ENTER_AMOUNT');
    }

    return errors;
}
