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
import footerLogo from '../../images/FooterHeading.svg'
import { setLocalData, getLocalData } from 'utils/cache';
import { rewardNumberValidation as validate } from 'utils/validates'
const RewardNumberPage = (props) => {
    const dispatch = useDispatch();
    const [ isClicked, setIsClicked ] = React.useState(false);
    const { handleSubmit, initialize } = props;
    const myWUNumber = getLocalData('myWUNumber')
    const onSubmit = (values) => {
        console.log(values.WUNumber);
        if (values.WUNumber) {
            setLocalData('myWUNumber',values.WUNumber)
            dispatch(postWUNumber(values.WUNumber));
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
                    <BorderTitle> Have a MyWU Rewards Number?</BorderTitle>
                    {!isClicked && <Button onClick={ () => setIsClicked(true) }>Click here to enter</Button>}
                    {!!isClicked &&
                        <>
                            <div className="wu-number">
                                <Field
                                    name="WUNumber"
                                    maxLength={ 9 }
                                    component={ renderField }
                                    normalize={ val => (val || '').replace(/[^\d]/g, '') }
                                />
                                <p className="note-para">Enter 9-digit My WU Number</p>
                            </div>
                        </>
                    }
                    <LinkText className="register">No MyWU Rewards ? <Link className="link" bold color="textOrange" href="#!">Click here to register</Link></LinkText>

                    <Card className="main-card">
                        <p className="description">
                            If you are a Western Union My WU Member you
                            can enter your 9 digit My WU number to earn points on
                            qualifying transactions.
                        </p>
                        <div className="card-link">
                            <img className="img-fluid my-2" src={ footerLogo } alt="back"/>
                            <LinkText>Western Union <Link className="link" bold color="textOrange" href="#!">Privacy Statement</Link></LinkText>
                            <LinkText>Western Union <Link className="link" bold color="textOrange" href="#!">Terms and Condition</Link></LinkText>
                            <LinkText>Western Union <Link className="link" bold color="textOrange" href="#!">FAQs</Link></LinkText>
                        </div>
                    </Card>
                </ div>
                <Footer>
                    { isClicked ? <Button outlined type='submit'>Next</Button> : <Link to='/protect-form' >Next</Link> }
                </Footer>
            </form>
        </RewardNumber>
    )
}

export default reduxForm({
    form: 'rewardNumber', // a unique identifier for this form
    validate
})(RewardNumberPage);