import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { postWUNumber } from 'middleware/receiver';
import { reduxForm, Field, change } from 'redux-form';
import { renderField } from 'utils/formUtils';
import Button from '../shared/Button.styled'
import Link from '../shared/Link.styled'
import BorderTitle from '../shared/BorderTitle.styled'
import LinkText from '../shared/LinkText.styled'
import RewardNumber from './RewardNumber.styles'
import { Card } from '../shared/Footer.styled'
import CardFooter from '../shared/CardFooter'
import { setLocalData, removeLocalData } from 'utils/cache';
import { rewardNumberValidation as validate } from 'utils/validates'
import PropTypes from 'prop-types';
import history from 'utils/history'
import { useTranslation } from 'react-i18next';
import { getParseHtmlArticle, getLocalDataMyWuNumber } from 'utils/helpers';
import { STATIC_URLS } from 'constants/app';
import { useSelector } from 'react-redux'
import { getUserDetailsUpdate } from 'middleware/user'
const RewardNumberPage = (props) => {
    const dispatch = useDispatch();
    const { handleSubmit, initialize } = props;
    const formValues = useSelector((state) => state.form.rewardNumber)

    const myWUNumber = getLocalDataMyWuNumber()
    const [ checked ,setChecked ] =  useState(myWUNumber ? true : false)
    const { t } = useTranslation();
    const onSubmit = (values) => {
        const checkedMyWuNumber = checked ? values?.WUNumber : null
        dispatch(getUserDetailsUpdate(t,checkedMyWuNumber))
        if (values.WUNumber) {
            setLocalData('myWUNumberTemp',  values?.WUNumber )
            dispatch(postWUNumber(values.WUNumber));
        }else{
            history.push('/protect-form')
        }
    }

    useEffect(() => {
        if(myWUNumber){
            initialize({
                WUNumber: myWUNumber
            })
        }
    },[ myWUNumber ])

    const handleSaveWUnumber = (event) => {
        setChecked(event.target.checked)
    }

    const continueWithoutMYWU = () => {
        myWUNumber && dispatch(getUserDetailsUpdate(t,null))
        dispatch(change('WUNumber',''))
        removeLocalData('myWUNumberTemp')
        history.push('/protect-form')

    }

    return (
        <RewardNumber>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <div className="rewardWrapper">
                    <BorderTitle> <h3>{t('HAVE_MY_WU_REWARDS_NUMBER')}
                        <span className="underline"></span></h3>
                    </BorderTitle>

                    <>
                        <div className="wu-number">
                            <Field
                                name="WUNumber"
                                maxLength={ 9 }
                                component={ renderField }
                                normalize={ val => (val || '').replace(/[^\d]/g, '') }
                                pattern="[0-9]*"
                                inputMode="numeric"
                            />
                            <input type='checkbox' checked={ checked } onChange={ handleSaveWUnumber } />
                            <p className="note-para">{t('SAVE_WU_NUMBER')}</p>
                        </div>
                    </>
                    <div className='continue-wrapper pt-5'>
                        {formValues?.values?.WUNumber ? <Button outlined className="w-100 m-auto"  type='submit'>{t('CONTINUE_WITH_MY_WU_NUMBER')}</Button>:  <Link outline bold to={ '#!' }>{t('ENTER_MY_WU_NUMBER')}</Link>}
                        <p className="description mt-3">{ getParseHtmlArticle('wu_131') }</p>
                        <LinkText className="register">{t('NO_MY_WU_REWARDS')} <Link className="link" bold color="textOrange" onClick={ () =>   window.open( STATIC_URLS.registerLink) }  to={ '#!' }>{t('CLICK_HEAR_TO_REGISTER')}</Link></LinkText>
                        <a className='btn btn-primary btn-p' onClick={ continueWithoutMYWU } to='/#' shadow >{t('CONTINUE_WITHOUT_MY_WU_NUMBER')}</a>
                    </div>
                    <Card className="main-card">
                        <CardFooter></CardFooter>
                    </Card>
                </ div>
            </form>
        </RewardNumber>
    )
}

RewardNumberPage.propTypes = {
    handleSubmit: PropTypes.func,
    initialize: PropTypes.object
};
export default reduxForm({
    form: 'rewardNumber', // a unique identifier for this form
    validate
})(RewardNumberPage);