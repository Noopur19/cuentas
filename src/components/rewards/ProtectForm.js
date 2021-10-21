import React from 'react';
import { Link } from 'react-router-dom';
import { getParseHtmlArticle } from 'utils/helpers'
const ProtectForm = (props) => {
    console.log(props)

    return (
        <div>
            <div>

                { getParseHtmlArticle('en_wu_119') }
                <>
                    <button type='submit' className='btn btn-light'>Cancel</button>
                    <Link to='/receiver-details' className='btn btn-primary'>Next</Link>
                </>
            </div>
        </div >
    )
}

export default ProtectForm;