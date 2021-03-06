import React, { useEffect, useState } from 'react';
import { change, Field, reduxForm  } from 'redux-form';
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
import { GET_STEP_PROGRESSBAR, MAT_PAT_FORMAT, MID_LAST_FORMAT } from 'constants/app'
import { useTranslation } from 'react-i18next';
import { getLocalDataMyWuNumber } from 'utils/helpers'

const ReceiverDetailsForm = (props) => {
    const dispatch  = useDispatch()
    const { t } = useTranslation()

    const nameFormat = useSelector((state) => state.theme.format)
    const matPatFormat = useSelector((state) => state.theme.isMatPatFormat)
    const midLastFormat = useSelector((state) => state.theme.isMidLastFormat)
    const { handleSubmit,receivers, initialize , submitData } = props;
    const countries = useSelector((state) => state.receiver.countries )
    const statesLoading = useSelector((state) => state.receiver.statesLoading )
    const states = useSelector((state) => state.receiver.states )
    const form = useSelector((state) => state.form.receiver_details)
    const [ state, setState ] = useState(null)
    const [ disableSubmit, setDisableSubmit ] = useState(false);
    const myWUNumber  = getLocalDataMyWuNumber() || getLocalData('myWUNumberTemp')

    useEffect(() => {
        dispatch(getAllCountries())
        if(form?.values?.country){
            const obj = JSON.parse(form.values.country)
            const countryCode = obj.country === 'Canada' ? 'CA' : (obj.country === 'Mexico' ? 'Mexico' : obj.currency[ 0 ].country_cd)
            dispatch(getAllStates(countryCode))
        }

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
        return states && states?.map((item) => ({ value: JSON.stringify(item), label: item.state } ))
    }

    const callStates = (countryCode, obj) =>{
        if(obj.country === 'United States' ||  obj.country === 'Mexico' || obj.country === 'Canada') {
            dispatch(getAllStates(countryCode))
        }else{
            setDisableSubmit(false)
            dispatch({
                type: 'CLEAR_STATES'
            })
        }
    }

    const handleChangeCountry = (event) => {
        setDisableSubmit(true)
        if(event.value){
            const obj = event.value && JSON.parse(event.value)
            const countryCode = obj.country === 'Canada' ? 'CA' : (obj.country === 'Mexico' ? 'Mexico' : obj.currency[ 0 ].country_cd)
            callStates(countryCode, obj)
            dispatch(change('receiver_details','city',null))
            dispatch(change('receiver_details','state',null))
        }
    }

    const handleChangeState = (event) => {
        const value  = event.value && JSON.parse(event.value)?.state
        const stateData = states.filter((data) => data.state ===  value)
        setState(stateData[ 0 ])
        dispatch(change('receiver_details','city',null))
    }

    const handleFormatA = () => {
        dispatch({ type: MID_LAST_FORMAT,set: true })
        initialize({
            givenName: '',
            paternalName: '',
            maternalName: '',
        })
    }

    const handleFormatB = () => {
        dispatch({ type: MAT_PAT_FORMAT,set: true })
        initialize({
            firstName: '',
            lastName: '',
            middleName: ''
        })
    }

    const handleChangeFormat = (event) => {
        const value  = event.value
        {value ===  t('FIRST_LAST_NAME_FORMAT') ? handleFormatA() : handleFormatB()}
        dispatch({
            type: 'SELECT_NAME_FORMAT',
            data: { value: event.value, label: event.label }
        })
    }

    const getCitiesOptions = () => {
        const formValues = form && form.values
        const stateData = state ||  formValues.state && JSON.parse(formValues.state)
        return stateData && stateData.city && stateData.city.map((item) => ({ value: item.city, label: item.city } )) || []
    }

    const getReceivers = () =>{
        return receivers && receivers.map((item) => ({ value: JSON.stringify(item),label: `${ item?.name?.first_name } ${ item?.name?.last_name }` }))
    }

    const getNameFormatOptions = () => {
        const options = [
            { value: t('FIRST_LAST_NAME_FORMAT'), label: t('FIRST_LAST_NAME_FORMAT') },
            { value: t('MAT_PAT_NAME_FORMAT'), label: t('MAT_PAT_NAME_FORMAT') } ]
        return  options.map((item) => ({ value: item.value, label: item.value }))
    }

    const handleChangeReceiver = (event) => {
        const data = event.value && JSON.parse(event.value)
        const obj =  countries && countries.filter((item) => item.currency[ item?.currency?.length -1  ][ 'country_cd' ] === data.address.country_iso_code)
        dispatch(getAllStates(obj[ 0 ].country))
        initialize({
            firstName: data?.name?.first_name,
            lastName: data?.name?.last_name,
            paternalName: data?.name?.paternal_name,
            maternalName: data?.name?.maternal_name,
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
                            placeholder="None"
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
                        name="nameFormat"
                        placeholder={ t('Select name format') }
                        handleChange = { handleChangeFormat }
                        options= { getNameFormatOptions() }
                        component={ renderSelectField }
                        selectedOption={  nameFormat }
                    />
                    {midLastFormat &&
                    <>
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
                            component={ renderField } />
                        <Field
                            name="lastName"
                            type="text"
                            placeholder={ t('RECEIVERS_LAST_NAME_STAR') }
                            component={ renderField } />
                    </>}
                    {matPatFormat &&
                    <>
                        <Field
                            name="givenName"
                            type="text"
                            placeholder={ t('RECEIVERS_GIVEN_NAME') }
                            component={ renderField }
                        />
                        <Field
                            name="paternalName"
                            type="text"
                            placeholder={ t('RECEIVERS_PATERNAL_NAME') }
                            component={ renderField } />
                        <Field
                            name="maternalName"
                            type="text"
                            placeholder={ t('RECEIVERS_MATERNAL_NAME') }
                            component={ renderField } />
                    </>}
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
                    {!!states.length  &&
                    <>
                        <Field
                            name="state"
                            placeholder={ t('STATE_TEXT') }
                            handleChange = { handleChangeState }
                            options= { getStatesOptions() }
                            component={ renderSelectField }
                        />
                        { form.values.state && states[ 0 ].city &&
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
                            initialize({})
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