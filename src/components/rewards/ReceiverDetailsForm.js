import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField } from 'utils/formUtils';

const ReceiverDetailsForm = () => {
    return (
        <div>
            <h3>Receiver Details</h3>
            <form >
                <p>Enter new recipient</p>
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
            </form>
        </div >
    )
}

export default reduxForm({
    form: 'receiver_details', // a unique identifier for this form
})(ReceiverDetailsForm);