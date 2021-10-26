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
import { Card } from '../../shared/Footer.styled'
import CardFooter from '../../shared/CardFooter'
import BorderTitle from '../../shared/BorderTitle.styled'
import { getLocalData } from 'utils/cache'

const ReceiverDetailsForm = (props) => {
    const dispatch  = useDispatch()
    const { handleSubmit,receivers, initialize, submitData } = props;
    const countries = useSelector((state) => state.receiver.countries )
    const statesLoading = useSelector((state) => state.receiver.statesLoading )
    const states = useSelector((state) => state.receiver.states )
    const form = useSelector((state) => state.form.receiver_details)
    const [ state, setState ] = useState(null)
    const [ disableSubmit, setDisableSubmit ] = useState(false);
    const myWUNumber  = getLocalData('myWUNumber')

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
        return countries && countries.map((item) => ({ value: JSON.stringify(item), label: item.country } ))
    }

    const getStatesOptions = () => {
        return states && states?.map((item) => ({ value: item.state, label: item.state } ))
    }

    const handleChangeCountry = (event) => {
        setDisableSubmit(true)
        if(event.value){
            const obj = event.value && JSON.parse(event.value)
            dispatch(getAllStates(obj.country))
        }
    }

    const handleChangeState = (event) => {
        const stateData = states.filter((data) => data.state === event.value)
        setState(stateData[ 0 ])
    }

    const getCitiesOptions = () => {
        return state && state.city && state.city.map((item) => ({ value: item.city, label: item.city } )) || []
    }

    const getReceivers = () =>{
        return receivers && receivers.map((item) => ({ value: JSON.stringify(item), label: `${ item.name.first_name } ${ item.name.last_name }` }))
        // receivers && receivers.map((item) => item)
    }

    const handleChangeReceiver = (event) => {
        const data = event.value && JSON.parse(event.value)
        const obj =  countries && countries.filter((item) => item.currency[ item?.currency?.length -1  ][ 'country_cd' ] === data.address.country_iso_code)
        dispatch(getAllStates(obj[ 0 ].country))
        initialize({
            firstName: data?.name?.first_name,
            lastName: data?.name?.last_name,
            country: obj[ 0 ] && JSON.stringify(obj[ 0 ] )
        })
    }
    return (
        <Card>
            <div>
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

                    <BorderTitle smallText>Enter new recipient</BorderTitle>
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
                    {!!states.length  && states[ 0 ].city &&
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
                    <CardFooter></CardFooter>
                    <Footer>
                        <Button >Back</Button>
                        <Button outlined disabled={ disableSubmit } type='submit'>Continue</Button>
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

})(ReceiverDetailsForm);