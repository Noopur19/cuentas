import React from 'react';
import { Link } from 'react-router-dom';

const ProtectForm = (props) => {
    console.log(props)
    return (
        <div>
            Protect Form
            <div>
                <>
                    <button type='submit' className='btn btn-light'>Cancel</button>
                    <Link to='/receiver-details-form' className='btn btn-primary'>Next</Link>
                </>
            </div>
        </div >
    )
}

export default ProtectForm;