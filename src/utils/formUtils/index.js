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
const renderNumberField = (props) => {
    const {
        input,
        fixed,
        step,
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

    const checkTwoDecimal = (value) => {
        if (value.includes('.')){
            if (value.split('.')[ 1 ].length > 2){
                return parseFloat(value).toFixed(fixed)
            }else{
                return (value)
            }
        }else{
            return value
        }
    }

    const changeData = (event) => {
        const value = event?.currentTarget?.value && event.currentTarget.value.replace(/[^0-9.]/g,'')
        handleChange && ( fixed ? handleChange(checkTwoDecimal(value)) : handleChange(value))
        fixed ? input.onChange(checkTwoDecimal(value)) :  input.onChange(value)
    }

    return (
        <>
            <Input rows={ rows } { ...input } pattern="[0-9][0-9.]*[0-9]" step={ step || 'any' } checked={ checked } onChange={ changeData }   maxLength={ maxLength } disabled={ disabled || false } type={ type } className={ validationError || (touched && error) ? 'form-control validation-error' : 'form-control' } placeholder={ placeholder || '' }/>

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
        placeholder,
        validationError,
        meta: { touched, error, warning },
        defaultWarning
    } = props;
    const customSelect = {
        control: (provided) => ({
            ...provided,
            background: (touched && error) ? '#f5dcdc96' : '#F7F7FA',
            border: (touched && error) ? '0.3px solid red' : '0.5px solid #D5D8DE',
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '0 0 4px 4px',
            marginTop: '5px',
            padding: '0 5px',
        }),
        option: (provided) => ({
            ...provided,
            background: 'white',
            color: '#000',
        })
    }

    const changeValue=(event) => {
        handleChange && handleChange(event)
        input.onChange(event.value)
    }

    const getSelectedOption = (value) => {
        return options.filter((item) => item.value === value )
    }

    return (
        <>

            <Select
                className={ error && 'has-error' }
                styles={ customSelect }
                value={ selectedOption || getSelectedOption(input?.value) }
                onChange={ changeValue }
                options={ options || [] }
                placeholder={ placeholder }
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
    renderSelectField,
    renderNumberField
};