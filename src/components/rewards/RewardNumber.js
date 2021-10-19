import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { getAllArticles } from 'middleware/articles'
const RewardNumberPage = () => {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        dispatch(getAllArticles())
    },[])
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <h3>Have a MyWU Rewards Number?</h3>
            <button >Click here to enter</button>

            <form onSubmit={ handleSubmit(onSubmit) }>
                <input type="number" { ...register('WUNumber', { required: true, maxLength: 9 }) } />
                <p>Enter 9 digit My WU Number</p>
                {errors.WUNumber && <p>Enter a valid 9 digit My WU Number</p>}
                <p>
                    If you are a Western Union My WU Member you
                    can enter your 9 digit My WU number to earn points on
                    qualifying transactions.
                </p>
                <h6>No MyWU Rewards ?<a href="#!">Click here to register</a></h6>
                <input type="submit" />
            </form>
        </div >
    )
}

export default RewardNumberPage;