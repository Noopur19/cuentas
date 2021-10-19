import * as React from 'react';
import { useForm } from "react-hook-form";

import Navbar from '../ui/Navbar';
import Button from '../ui/Button';
import Footer from '../ui/Footer';

const RewardNumberPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <Navbar />
            <h3>Have a MyWU Rewards Number?</h3>
            <Button title="Click here to enter" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="number" {...register("WUNumber", { required: true, maxLength: 9 })} />
                <p>Enter 9 digit My WU Number</p>
                {errors.WUNumber && <p>Enter a valid 9 digit My WU Number</p>}
                <p>
                    If you are a Western Union My WU Member you
                    can enter your 9 digit My WU number to earn points on
                    qualifying transactions.
                </p>
                <h6>No MyWU Rewards ?<a href="#!">Click here to register</a></h6>
                <Footer />
                <input type="submit" />
            </form>
        </div >
    )
}

export default RewardNumberPage;