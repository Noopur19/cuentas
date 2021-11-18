import axiosInstance from 'services/api';
import {
    getTransactionHistoryRequest,
    getTransactionHistorySuccess,
    getTransactionHistoryFailed,
    postTransactionEnquiryRequest,
    postTransactionEnquirySuccess,
    postTransactionEnquiryFailed,
    postSendEmailRequest,
    postSendEmailSuccess,
    postSendEmailFailed,
    postCancelTransactionRequest,
    postCancelTransactionSuccess,
    postCancelTransactionFailed,
    postConfirmTransferRequest,
    postConfirmTransferSuccess,
    postConfirmTransferFailed,
    getInvoiceDetailsRequest,
    getInvoiceDetailsSuccess,
    getInvoiceDetailsFailed
} from 'actions/transaction-details';
import { getUser } from 'utils/helpers'
import { getIncommHeaders } from 'utils/helpers'
import { GET_ERROR_FIELD } from 'constants/app'
import _ from 'lodash'
import { confirmTransferRequestPayload } from '../utils/helpers';
import history from 'utils/history';
import { ROUTES } from 'constants/AppRoutes';
import { notification } from 'services/notification';

export const getTransactionHistory = (t) => {
    const user = getUser()
    return (dispatch) => {
        dispatch(getTransactionHistoryRequest())
        axiosInstance.get(`invoices?filterUser=${ user.id }&filterSku=western_union`)
            .then((response) => {
                if(response.status == 200){
                    dispatch(getTransactionHistorySuccess(response.data))
                } else if( response?.result[ 0 ] && response?.result[ 0 ]?.responseMessage){
                    notification('error',response?.result[ 0 ]?.responseMessage)
                } else {
                    notification('error',`${ t('SOMETHING_WENT_WRONG_ERROR') }`)
                }
            }).catch((error) => {
                dispatch(getTransactionHistoryFailed(error))
                notification('error',GET_ERROR_FIELD.ERROR(error))
            })
    }
}

export const postTransactionEnquiry = (receiver,sender,mtcn) => {
    const receiverData = {
        'receiver': {
            'name': {
                'first_name': receiver.name.first_name || '',
                'last_name':  receiver.name.last_name || ''
            },
            'address': {
                'country_iso_code': receiver.address.country_iso_code || ''
            }
        },
        'mtcn': mtcn
    }
    const senderData = {
        'receiver': {
            'name': {
                'first_name': sender.name.first_name || '',
                'last_name':  sender.name.last_name || ''
            },
            'address': {
                'country_iso_code': sender.address.country_iso_code || ''
            }
        },
        'mtcn': mtcn
    }
    const errorText = 'E0203 TRANSACTION DOES NOT EXIST OR ACCOUNT NOT VALID'
    return  (dispatch) => {
        dispatch(postTransactionEnquiryRequest())
        axiosInstance.post('incomm/wu/transaction/enquiry',receiverData,
            { headers: _.merge(getIncommHeaders(), { 'Content-Type' : 'application/json' }) } )
            .then((result) => {
                dispatch(postTransactionEnquirySuccess(result.data))
            }).catch((error) => {
                if(error?.response?.data?.result[ 0 ]?.cause?.root?.Envelope?.Body?.Fault?.detail[ 'error-reply' ].error === errorText) {
                    dispatch(postTransactionEnquiryRequest())
                    axiosInstance.post('incomm/wu/transaction/enquiry',senderData,
                        { headers: _.merge(getIncommHeaders(), { 'Content-Type' : 'application/json' }) } )
                        .then((result) => {
                            dispatch(postTransactionEnquirySuccess(result.data))
                        }).catch((err) => {
                            dispatch(postTransactionEnquiryFailed(err))
                        })
                } else {
                    dispatch(postTransactionEnquiryFailed(error))
                }
            })
    }
}

export const postSendEmail = (invoiceId) => {
    return (dispatch) => {
        dispatch(postSendEmailRequest())
        axiosInstance.post('incomm/wu/sms/sendEmail', { invoiceId },
            { headers: _.merge(getIncommHeaders(), { 'Content-Type' : 'application/json' }) } )
            .then((response) => {
                dispatch(postSendEmailSuccess(response.data))
                notification('success','Successfully sent receipt')
                response?.result[ 0 ]?.responseMessage &&  notification('error',response?.result[ 0 ]?.responseMessage)
            }).catch((error) => {
                dispatch(postSendEmailFailed(error))
            })
    }
}

export const postCancelTransaction = (data, receiver, sender, mtcn) => {
    return (dispatch) => {
        dispatch(postCancelTransactionRequest())
        axiosInstance.post('incomm/wu/cancel', data,{ headers: _.merge(getIncommHeaders(), { 'x-knetikcloud-channel' : 'app', 'Content-Type' : 'application/json' }) } )
            .then((response) => {
                dispatch(postCancelTransactionSuccess(response.data))
                if (response.data && response.data.transaction_status === 'REFUND FORCE PAID' ||
            response.data.transaction_status === 'CANCEL COMPLETED') {
                    dispatch(postTransactionEnquiry(receiver, sender, mtcn))
                }
            }).catch((error) => {
                dispatch(postCancelTransactionFailed(error))
            })
    }
}

export const postConfirmTransfer = (data, finalAmount, stores, t) => {
    const postData = confirmTransferRequestPayload(data, finalAmount, stores)
    return (dispatch) => {
        dispatch(postConfirmTransferRequest())
        axiosInstance.post('/incomm/wu/sms', postData,
            { headers: _.merge(getIncommHeaders(), { 'x-knetikcloud-channel' : 'app', 'Content-Type' : 'application/json' }) } )
            .then((response) => {
                if(response.status == 200){
                    dispatch(postConfirmTransferSuccess(response.data))
                    history.push(ROUTES.SUCCESS_PAGE)
                }
                else if( response?.data?.result[ 0 ]?.cause?.root?.Envelope?.Body?.Fault?.detail[ 'error-reply' ].error ) {
                    notification('error',response?.data?.result[ 0 ]?.cause?.root?.Envelope?.Body?.Fault?.detail[ 'error-reply' ].error)
                } else {
                    notification('error',`${ t('SOMETHING_WENT_WRONG_ERROR') }`)
                }
            }).catch((error) => {
                dispatch(postConfirmTransferFailed(error))
                // notification('error',GET_ERROR_FIELD.ERROR(error))
            })
    }
}

export const getInvoiceDetails = (invoiceId) => {
    return (dispatch) => {
        dispatch(getInvoiceDetailsRequest())
        axiosInstance.get(`/invoices/${ invoiceId }`)
            .then((response) => {
                dispatch(getInvoiceDetailsSuccess(response.data))
                response?.result[ 0 ]?.responseMessage &&  notification('error',response?.result[ 0 ]?.responseMessage)
            }).catch((error) => {
                dispatch(getInvoiceDetailsFailed(error))
            })
    }
}