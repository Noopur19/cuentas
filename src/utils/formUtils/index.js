/* eslint-disable react/prop-types */
/*
 * Collection of redux form fields
 * With some validations over these fields
*/

import React from 'react';

export const Validations = (props) => {
    const {
        touched,
        error,
        validationError,
        warning,
        withoutTouch
    } = props.props;

    return (
        <>
            {withoutTouch && <p>
                {((error && <span className={ `field_error ${ error === 'dummy-error' && 'dummy-error' }` }>{error}</span>) || (warning && <span>{warning}</span>))}
            </p>}
            {validationError && (
                <p>
                    {(validationError && <span className={ `field_error ${ error === 'dummy-error' && 'dummy-error' }` }>{validationError}</span>)}
                </p>
            )}

            {!withoutTouch && <p>
                {touched && ((error && <span className={ `field_error ${ error === 'dummy-error' && 'dummy-error' }` }>{error}</span>) || (warning && <span>{warning}</span>))}
            </p>
            }
        </>
    );
};

const renderField = (props) => {
    const {
        input,
        type,
        placeholder,
        disabled,
        validationError,
        meta: { touched, error, warning },
        maxLength,
        rows,
        defaultWarning
    } = props;

    return (
        <>
            <input rows={ rows } { ...input }  maxLength={ maxLength } disabled={ disabled || false } type={ type } className={ validationError || (touched && error) ? 'form-control validation-error' : 'form-control' } placeholder={ placeholder || '' }/>

            {defaultWarning && !input.value && <span className="default-warning"><i className="fas fa-exclamation-triangle"></i> {defaultWarning}</span>}
            <Validations
                props={ {
                    touched,
                    error,
                    validationError,
                    warning,
                } }
            />
        </>
    );
};

export {
    renderField,
};