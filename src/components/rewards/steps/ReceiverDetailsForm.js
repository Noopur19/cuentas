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
import PropTypes from 'prop-types';
import history from 'utils/history'
import { ROUTES } from 'constants/AppRoutes'
import { GET_STEP_PROGRESSBAR } from 'constants/app'
import { useTranslation } from 'react-i18next';

const ReceiverDetailsForm = (props) => {
    const dispatch  = useDispatch()
    const { t } = useTranslation()

    const { handleSubmit,receivers, initialize ,submitData } = props;
    const countries = useSelector((state) => state.receiver.countries )
    const statesLoading = useSelector((state) => state.receiver.statesLoading )
    const states = useSelector((state) => state.receiver.states )
    const form = useSelector((state) => state.form.receiver_details)
    const [ state, setState ] = useState(null)
    const [ disableSubmit, setDisableSubmit ] = useState(false);
    const myWUNumber  = getLocalData('myWUNumber')

    // const resetForm = () => {
    //     initialize({
    //         firstName: null,
    //         lastName: null,
    //         country: null
    //     })
    // }
    useEffect(() => {
        dispatch(getAllCountries())
        dispatch({
            type: GET_STEP_PROGRESSBAR,
            data: { title: `${ t('RECIEVER') } ${ t('DETAILS') }`, step: 1 }
        })
        // resetForm()
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
        <Card className="progress-card">
            <div>
                <form onSubmit={ handleSubmit( submit ) } >
                    { (!_.isEmpty(receivers)) &&
                    <>
                        <p className="text-center myu-head"><b>MY WU # { myWUNumber } </b></p>
                        <LinkText>{t('VIEW')} <Link className="link" bold color="textOrange" to="/transaction-history">{t('TRANSACTION_HISTORY')}</Link></LinkText>
                        <BorderTitle smallText><h3>{t('SELECT_YOUR_PAST_RECEIVERS')}
                            <span className="underline"></span></h3>
                        </BorderTitle>
                        <Field
                            name="receiver"
                            placeholder="Receivers first name*"
                            handleChange = { handleChangeReceiver }
                            component={ renderSelectField }
                            options={ getReceivers() }
                        />
                    </>

                    }

                    <BorderTitle smallText><h3>{(!_.isEmpty(receivers))  ? t('OR_ENTER_NEW_RECIPIENT') : t('ENTER_NEW_RECIPIENT')}
                        <span className="underline"></span></h3>
                    </BorderTitle>
                    <Field
                        name="firstName"
                        type="text"
                        placeholder={ t('RECEIVERS_FIRST_NAME_STAR') }
                        component={ renderField }
                    />
                    <Field
                        name="middleName"
                        type="text"
                        placeholder={ t('RECEIVERS_MIDDLE_NAME') }
                        component={ renderField }
                    />
                    <Field
                        name="lastName"
                        type="text"
                        placeholder={ t('RECEIVERS_LAST_NAME_STAR') }
                        component={ renderField }
                    />
                    <Field
                        name="email"
                        type="email"
                        placeholder={ t('E_MAIL') }
                        component={ renderField }
                    />
                    <Field
                        name="country"
                        placeholder={ t('COUNTRY') }
                        handleChange = { handleChangeCountry }
                        options= { getCountriesOptions() }
                        component={ renderSelectField }
                    />
                    {!!states.length  && states[ 0 ].city &&
                    <>
                        <Field
                            name="state"
                            placeholder={ t('STATE_TEXT') }
                            handleChange = { handleChangeState }
                            options= { getStatesOptions() }
                            component={ renderSelectField }
                        />
                        { form.values.state &&
                        <Field
                            name="city"
                            placeholder={ t('CITY_TEXT') }
                            handleChange = { null }
                            options= { getCitiesOptions() }
                            component={ renderSelectField }
                        />
                        }
                    </>
                    }
                    <CardFooter></CardFooter>
                    <Footer>
                        <Button type='button' onClick={ () =>
                        {
                            history.push(ROUTES.PROTECT_FORM)
                        } } >{ t('BACK') }</Button>
                        <Button outlined disabled={ disableSubmit } type='submit'>{t('CONTINUE')}</Button>
                    </Footer>
                </form>
            </div>
        </Card>
    )
}
ReceiverDetailsForm.propTypes = {
    handleSubmit: PropTypes.func,
    initialize: PropTypes.object,
    prevPage: PropTypes.func,
    receivers: PropTypes.func,
    submitData: PropTypes.func
};

export default reduxForm({
    form: 'receiver_details', // a unique identifier for this form
    destroyOnUnmount: false,
    validate

})(ReceiverDetailsForm);