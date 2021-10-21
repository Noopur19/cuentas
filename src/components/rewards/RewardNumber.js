import React from 'react';
import { useDispatch } from 'react-redux'
import { postWUNumber } from 'middleware/wuNumber';
import { Field, reduxForm } from 'redux-form';
import { renderField } from 'utils/formUtils';
import StyledContainer from 'components/shared/Container.styled'
import Button from '../shared/Button.styled'
import Link from '../shared/Link.styled'
import RewardTitle from '../shared/RewardTitle.styled'
import LinkText from '../shared/LinkText.styled'
import Footer from '../shared/Footer'
const RewardNumberPage = (props) => {
    const dispatch = useDispatch();
    const [ isClicked, setIsClicked ] = React.useState(false);
    const { handleSubmit } = props;
    const onSubmit = (values) => {
        console.log(values.WUNumber);
        if (values.WUNumber) {
            dispatch(postWUNumber(values.WUNumber));
        }
    }

    return (
        <StyledContainer>
            <RewardTitle> Have a MyWU Rewards Number?</RewardTitle>
            {!isClicked && <Button onClick={ () => setIsClicked(true) }>Click here to enter</Button>}
            <form onSubmit={ handleSubmit( onSubmit ) }>
                {!!isClicked &&
                <>
                    <Field
                        name="WUNumber"
                        maxLength={ 9 }
                        component={ renderField }
                        normalize={ val => (val || '').replace(/[^\d]/g, '') }
                    />
                    <p>Enter 9-digit My WU Number</p>
                </>
                }
                <p className="mt-4">
                    If you are a Western Union My WU Member you
                    can enter your 9 digit My WU number to earn points on
                    qualifying transactions.
                </p>
                <LinkText>No MyWU Rewards ? <Link className="link" bold color="orange" to="#!">Click here to register</Link></LinkText>
                <Footer />
                { isClicked ? <Button outlined type='submit'>Next</Button> : <Link to='/protect-form' >Next</Link> }
            </form>
        </StyledContainer>
    )
}

export default reduxForm({
    form: 'simple', // a unique identifier for this form
})(RewardNumberPage);