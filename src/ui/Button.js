import * as  React from 'react';

const Button = (props) => {
    return (
        <div>
            <button
                type={props.buttonType || null}
                onClick={props.handleButtonClick}
            >{props.title}</button>
        </div>
    )
}

export default Button;
