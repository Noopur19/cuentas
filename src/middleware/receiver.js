import axiosInstance from 'services/api';
import {
    getWUNumberRequest,
    getWUNumberSuccess,
    getWUNumberFailed,
    getAllCountriesRequest,
    getAllCountriesSuccess,
    getAllCountriesFailed,
    getAllStatesRequest,
    getAllStatesSuccess,
    getAllStatesFailed
} from 'actions/receiver';

export const postWUNumber = (wuNumber) => {
    return (dispatch) => {
        dispatch(getWUNumberRequest(wuNumber))
        axiosInstance.get(`incomm/wu/myWU?number=${ wuNumber }`).then((response) => {
            dispatch(getWUNumberSuccess(response.data))
        }).catch((error) => {
            dispatch(getWUNumberFailed(error))
        })
    }
}

export const getAllCountries = ( ) => {
    return (dispatch) => {
        dispatch(getAllCountriesRequest())
        axiosInstance.get('/incomm/wu/countrycurrency').then((response) => {
            dispatch(getAllCountriesSuccess(response.data))
        }).catch((error) => {
            dispatch(getAllCountriesFailed(error))
        })
    }
}

export const getAllStates = (country) => {
    return (dispatch) => {
        dispatch(getAllStatesRequest())
        axiosInstance.get(`/incomm/wu/statecity?country=${ country }`).then((response) => {
            dispatch(getAllStatesSuccess(response.data))
        }).catch((error) => {
            dispatch(getAllStatesFailed(error))
        })
    }
}