import { MESSAGE } from 'constants/app'
import { SubmissionError } from 'redux-form'

export const receiverFormValidate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = MESSAGE.REQUIRE('first name');
    }
    if (!values.lastName) {
        errors.lastName = MESSAGE.REQUIRE('last name');
    }
    if(values.email && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))){
        errors.email = MESSAGE.VALID_ENTER('email');
    }
    if (!values.country) {
        errors.country = MESSAGE.REQUIRE('country');
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
    if (states.length > 0) {
        if (!values.state) {
            throwError( 'state',MESSAGE.REQUIRE('state'))
        }
        if (!values.city) {
            throwError( 'city',MESSAGE.REQUIRE('city'))
        }
    }
    return true;
}
