/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from 'utils/helpers'
export const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = getToken()
    return (
        <Route
            exact={ true }
            { ...rest }
            render={ (props) =>
                !token ?
                    <Redirect
                        to={ {
                            pathname: '/',
                            state: { from: props.location },
                        } }
                    />
                    : (
                        <Component { ...props } />
                    )
            }
        />
    )
}
