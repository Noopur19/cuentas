import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux'
import { renderField , renderSelectField } from 'utils/formUtils';
import Button from 'components/shared/Button.styled'
import Footer from 'components/shared/Footer'
import { getAllCountries } from 'middleware/receiver'
const ReceiverDetailsForm = (props) => {
    const dispatch  = useDispatch()
    const { handleSubmit,submitData } = props;
    const countries = useSelector((state) => state.receiver.countries )
    useEffect(() => {
        dispatch(getAllCountries())
    },[])

    const getOptions = () => {
        return countries && countries.map((item) => ({ value: item.country, label: item.country } ))
    }

    const handleChangeCountry = (event) => {
        console.log(event)
    }
    return (
        <div>
            <h3>Receiver Details</h3>
            <form onSubmit={ handleSubmit( submitData ) } >
                <p>Enter new recipient</p>
                <Field
                    name="firstName"
                    type="text"
                    placeholder="Receivers first name*"
                    component={ renderField }
                />
                <Field
                    name="middleName"
                    type="text"
                    placeholder="Receivers middle name"
                    component={ renderField }
                />
                <Field
                    name="lastName"
                    type="text"
                    placeholder="Receivers last name*"
                    component={ renderField }
                />
                <Field
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    component={ renderField }
                />
                <Field
                    name="country"
                    placeholder="Country"
                    handleChange = { handleChangeCountry }
                    options= { getOptions() }
                    component={ renderSelectField }
                />
                <Footer>
                    <Button outlined type='submit'>Next</Button>
                </Footer>
            </form>
        </div >
    )
}

export default reduxForm({
    form: 'receiver_details', // a unique identifier for this form
    destroyOnUnmount: false,

})(ReceiverDetailsForm);