import React from 'react';
import history from 'utils/history'
import { getParseHtmlArticle } from 'utils/helpers'
import Button from 'components/shared/Button.styled'
import Footer from 'components/shared/Footer'

const ProtectForm = (props) => {
    console.log(props)

    const onClickHandler = () => {
        history.push('/receiver-details')
    }

    return (
        <div>
            <div>
                { getParseHtmlArticle('en_wu_119') }
                <Footer>
                    <Button >Back</Button>
                    <Button outlined onClick={ () => onClickHandler() } type='submit'>Continue</Button>
                </Footer>
            </div>
        </div >
    )
}

export default ProtectForm;