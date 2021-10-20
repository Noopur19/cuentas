import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getAllArticles } from 'middleware/articles';
import { postWUNumber } from 'middleware/wuNumber';
import { Field, reduxForm } from 'redux-form';
import renderField from 'utils/formUtils/renderField';

const RewardNumberPage = (props) => {
    const dispatch = useDispatch();
    const [ isClicked, setIsClicked ] = React.useState(false);
    const { handleSubmit } = props;
    useEffect(() => {
        dispatch(getAllArticles())
    }, [])

    const onSubmit = (values) => {
        console.log(values.WUNumber);
        if (values.WUNumber) {
            dispatch(postWUNumber(values.WUNumber));
        }
    }

    return (
        <div>
            <h3>Have a MyWU Rewards Number?</h3>
            {!isClicked && <button onClick={ () => setIsClicked(true) }>Click here to enter</button>}
            <form onSubmit={ handleSubmit( onSubmit ) }>
                {!!isClicked &&
                <>
                    <Field name="WUNumber" component={ renderField } />
                    <p>Enter 9-digit My WU Number</p>
                </>
                }
            </form>
            <p>
                If you are a Western Union My WU Member you
                can enter your 9 digit My WU number to earn points on
                qualifying transactions.
            </p>
            <h6>No MyWU Rewards ?<a href="#!">Click here to register</a></h6>
        </div >
    )
}

export default reduxForm({
    form: 'simple', // a unique identifier for this form
})(RewardNumberPage);