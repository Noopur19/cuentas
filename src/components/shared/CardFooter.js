import React from 'react';
import LinkText from '../shared/LinkText.styled'
import Link from '../shared/Link.styled'
import footerLogo from '../../images/FooterHeading.svg'
import CardBottom from '../shared/CardFooter.styled'

const CardFooter = (props) => {
    console.log(props)

    return (
        <>
            <CardBottom className="CardFooter">

                <p className="description">
                    If you are a Western Union My WU Member you
                    can enter your 9 digit My WU number to earn points on
                    qualifying transactions.
                </p>
                <div className="card-link">
                    <img className="img-fluid my-2" src={ footerLogo } alt="back"/>
                    <LinkText>Western Union <Link className="link" bold color="textOrange" href="#!">Privacy Statement</Link></LinkText>
                    <LinkText>Western Union <Link className="link" bold color="textOrange" href="#!">Terms and Condition</Link></LinkText>
                    <LinkText>Western Union <Link className="link" bold color="textOrange" href="#!">FAQs</Link></LinkText>
                </div>

            </CardBottom>
        </>
    )
}

export default CardFooter;