import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux'
import { renderField , renderSelectField } from 'utils/formUtils';
import Button from 'components/shared/Button.styled'
import Footer from 'components/shared/Footer'
import { getAllCountries, getAllStates } from 'middleware/receiver'

const ReceiverDetailsForm = (props) => {
    const dispatch  = useDispatch()
    const { handleSubmit,submitData } = props;
    const countries = useSelector((state) => state.receiver.countries )
    const states = useSelector((state) => state.receiver.states )

    const [ state, setState ] = useState(null)

    console.log(states);

    useEffect(() => {
        dispatch(getAllCountries())
    },[])

    const getCountriesOptions = () => {
        return countries && countries.map((item) => ({ value: item.country, label: item.country } ))
    }

    const getStatesOptions = () => {
        return states && states?.map((item) => ({ value: item.state, label: item.state } ))
    }

    const handleChangeCountry = (event) => {
        console.log(event.value)
        if(event.value === 'Mexico') {
            dispatch(getAllStates(event.value))
        }
    }

    const handleChangeState = (event) => {
        const stateData = states.filter((data) => data.state === event.value)
        setState(stateData[ 0 ])
    }

    const getCitiesOptions = () => {
        return state && state.city.map((item) => ({ value: item.city, label: item.city } ))
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
                    options= { getCountriesOptions() }
                    component={ renderSelectField }
                />
                {!!states.length &&
                <>
                    <Field
                        name="state"
                        placeholder="State"
                        handleChange = { handleChangeState }
                        options= { getStatesOptions() }
                        component={ renderSelectField }
                    />
                    <Field
                        name="city"
                        placeholder="City"
                        handleChange = { null }
                        options= { getCitiesOptions() }
                        component={ renderSelectField }
                    />
                </>
                }
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