import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { postWUNumber } from 'middleware/receiver';
import { reduxForm, Field } from 'redux-form';
import { renderField } from 'utils/formUtils';
import Button from '../shared/Button.styled'
import Link from '../shared/Link.styled'
import BorderTitle from '../shared/BorderTitle.styled'
import LinkText from '../shared/LinkText.styled'
import Footer from '../shared/Footer'
import RewardNumber from './RewardNumber.styles'
import { Card } from '../shared/Footer.styled'
import CardFooter from '../shared/CardFooter'
import { setLocalData, getLocalData, removeLocalData } from 'utils/cache';
import { rewardNumberValidation as validate } from 'utils/validates'
import PropTypes from 'prop-types';
import history from 'utils/history'
import { useTranslation } from 'react-i18next';
import { getParseHtmlArticle } from 'utils/helpers';
import { STATIC_URLS } from 'constants/app';
const RewardNumberPage = (props) => {
    const dispatch = useDispatch();
    const [ isClicked, setIsClicked ] = React.useState(false);
    const { handleSubmit, initialize } = props;
    const myWUNumber = getLocalData('myWUNumber')
    const { t } = useTranslation();
    const onSubmit = (values) => {
        console.log(values.WUNumber);
        if (values.WUNumber) {
            setLocalData('myWUNumber',values.WUNumber)
            dispatch(postWUNumber(values.WUNumber));
        }else{
            removeLocalData('myWUNumber')
            history.push('/protect-form')
        }
    }

    useEffect(() => {
        initialize({
            WUNumber: myWUNumber
        })
        myWUNumber && setIsClicked(true)
    },[ myWUNumber ])

    return (
        <RewardNumber>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <div className="rewardWrapper">
                    <BorderTitle> <h3>{t('HAVE_MY_WU_REWARDS_NUMBER')}</h3></BorderTitle>
                    {!isClicked && <Button onClick={ () => setIsClicked(true) }>{t('CLICK_HEAR_TO_ENTER')}</Button>}
                    {!!isClicked &&
                        <>
                            <div className="wu-number">
                                <Field
                                    name="WUNumber"
                                    maxLength={ 9 }
                                    component={ renderField }
                                    normalize={ val => (val || '').replace(/[^\d]/g, '') }
                                />
                                <p className="note-para">{t('ENTER_WU_NUMBER')}</p>
                            </div>
                        </>
                    }
                    <LinkText className="register">{t('NO_MY_WU_REWARDS')} <Link className="link" bold color="textOrange" onClick={ () => window.open( STATIC_URLS.registerLink) }  to={ '#!' }>{t('CLICK_HEAR_TO_REGISTER')}</Link></LinkText>

                    <Card className="main-card">
                        <p className="description">{ getParseHtmlArticle('wu_131') }</p>
                        <CardFooter></CardFooter>
                    </Card>
                </ div>
                <Footer>
                    { isClicked ? <Button className="w-100" outlined type='submit'>{t('NEXT')}</Button> : <Link to='/protect-form' >{t('NEXT')}</Link> }
                </Footer>
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