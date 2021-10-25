import * as React from 'react';
import  Loader from '../shared/Loader.styled';
import loaderIcon from '../../images/app_icon_gold.png'

const Navbar = () => {
    return (
        <Loader className="loader">
            <img className="img-fluid" src={ loaderIcon } alt="loaderIcon"/>
        </Loader>
    )
}

export default Navbar;