/* eslint-disable react/prop-types */
/*
 * Collection of redux form fields
 * With some validations over these fields
*/

import { Input } from 'components/shared/Input.styled';
import React from 'react';
import Select from 'react-select';
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
        checked,
        validationError,
        handleChange,
        meta: { touched, error, warning },
        maxLength,
        rows,
        defaultWarning
    } = props;

    const changeData = (event) => {
        handleChange && handleChange(event.currentTarget.value)
        input.onChange(event.currentTarget.value)
    }

    return (
        <>
            <Input rows={ rows } { ...input } checked={ checked } onChange={ changeData }   maxLength={ maxLength } disabled={ disabled || false } type={ type } className={ validationError || (touched && error) ? 'form-control validation-error' : 'form-control' } placeholder={ placeholder || '' }/>

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

const renderSelectField = (props) => {
    const {
        input,
        options,
        selectedOption,
        handleChange,
        validationError,
        meta: { touched, error, warning },
        defaultWarning
    } = props;
    const customSelect = {
        background: '#F7F7FA',
        border:' 0.5px solid #D5D8DE',
        boxSizing: 'border-box',
        borderRadius: '6px',
    }

    const changeValue=(event) => {
        handleChange && handleChange(event)
        input.onChange(event.value)
    }

    const getSelectedOption = (value) => {
        debugger
        return options.filter((item) => item.value === value )
    }

    return (
        <>
            <Select
                styles={ customSelect }
                value={ selectedOption || getSelectedOption(input?.value) }
                onChange={ changeValue }
                options={ options || [] }
            />

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
    renderSelectField
};