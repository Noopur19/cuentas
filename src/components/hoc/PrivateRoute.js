/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getToken } from 'utils/helpers'
export const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = getToken()
    const isMobile = window?.navigator?.userAgentData?.mobile || true
    if(isMobile){
        return (
            <Route
                exact={ true }
                { ...rest }
                render={ (props) =>
                    !token ?
                        <Redirect
                            to={ {
                                pathname: '/error',
                                state: { from: props.location },
                            } }
                        />
                        : (
                            <Component { ...props } />
                        )
                }
            />
        )
    }else{
        return  <Route
            exact={ true }
            { ...rest }
            render={ (props) =>

                <Redirect
                    to={ {
                        pathname: '/error',
                        state: { from: props.location },
                    } }
                />

            }
        />

    }

}
