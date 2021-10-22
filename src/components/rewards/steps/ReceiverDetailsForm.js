import React, { useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { receiverFormSubmissionValidate as submissionValidate, receiverFormValidate as validate } from 'utils/validates'
import { useDispatch, useSelector } from 'react-redux'
import { renderField , renderSelectField } from 'utils/formUtils';
import Button from 'components/shared/Button.styled'
import Footer from 'components/shared/Footer'
import { getAllCountries, getAllStates } from 'middleware/receiver'
import _ from 'lodash'
import LinkText from '../../shared/LinkText.styled'
import Link from '../../shared/Link.styled'

const ReceiverDetailsForm = (props) => {
    const dispatch  = useDispatch()
    const { handleSubmit,submitData,receivers,myWUNumber, initialize } = props;
    const countries = useSelector((state) => state.receiver.countries )
    const statesLoading = useSelector((state) => state.receiver.statesLoading )
    const states = useSelector((state) => state.receiver.states )
    const form = useSelector((state) => state.form.receiver_details)
    const [ state, setState ] = useState(null)
    const [ disableSubmit, setDisableSubmit ] = useState(false);
    useEffect(() => {
        dispatch(getAllCountries())
    },[])

    useEffect(() => {
        setDisableSubmit(statesLoading)
    },[ statesLoading ])

    const submit = (values) => {
        if(submissionValidate(values,states)){
            submitData(values)
        }
    }

    const getCountriesOptions = () => {
        return countries && countries.map((item) => ({ value: item.country, label: item.country } ))
    }

    const getStatesOptions = () => {
        return states && states?.map((item) => ({ value: item.state, label: item.state } ))
    }

    const handleChangeCountry = (event) => {
        setDisableSubmit(true)
        dispatch(getAllStates(event.value))
    }

    const handleChangeState = (event) => {
        const stateData = states.filter((data) => data.state === event.value)
        setState(stateData[ 0 ])
    }

    const getCitiesOptions = () => {
        return state && state.city.map((item) => ({ value: item.city, label: item.city } ))
    }

    const getReceivers = () =>{
        return receivers && receivers.map((item) => ({ value: JSON.stringify(item), label: `${ item.name.first_name } ${ item.name.last_name }` }))
        // receivers && receivers.map((item) => item)
    }

    const handleChangeReceiver = (event) => {
        const data = event.value && JSON.parse(event.value)
        console.log(data);
        initialize({
            firstName: data?.name?.first_name,
            lastName: data?.name?.last_name
        })
    }
    return (
        <div>
            <h3>Receiver Details</h3>
            <form onSubmit={ handleSubmit( submit ) } >
                { (!_.isEmpty(receivers)) &&
                <>
                    <b>MY WU # { myWUNumber } </b>
                    <LinkText>View <Link className="link" bold color="textOrange" to="/transaction-history">Transaction History</Link></LinkText>
                    <p>Select your past receiver</p>
                    <Field
                        name="receiver"
                        placeholder="Receivers first name*"
                        handleChange = { handleChangeReceiver }
                        component={ renderSelectField }
                        options={ getReceivers() }
                    />
                </>

                }

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
                {!!states.length  &&
                <>
                    <Field
                        name="state"
                        placeholder="State"
                        handleChange = { handleChangeState }
                        options= { getStatesOptions() }
                        component={ renderSelectField }
                    />
                    { form.values.state &&
                    <Field
                        name="city"
                        placeholder="City"
                        handleChange = { null }
                        options= { getCitiesOptions() }
                        component={ renderSelectField }
                    />
                    }
                </>
                }
                <Footer>
                    <Button >Back</Button>
                    <Button outlined disabled={ disableSubmit } type='submit'>Continue</Button>
                </Footer>
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'receiver_details', // a unique identifier for this form
    destroyOnUnmount: false,
    validate

})(ReceiverDetailsForm);