import { ActionTypes } from './actionTypes'

export const getTransactionHistoryRequest = () => {
    return { type: ActionTypes.GET_TRANSACTION_HISTORY_REQUEST }
}
export const getTransactionHistorySuccess = (response) => {
    return {
        type: ActionTypes.GET_TRANSACTION_HISTORY_SUCCESS,
        payload: response
    }
}
export const getTransactionHistoryFailed = () => {
    return {
        type: ActionTypes.GET_TRANSACTION_HISTORY_FAILED,
    }
}

export const postTransactionEnquiryRequest = () => {
    return { type: ActionTypes.POST_TRANSACTION_ENQUIRY_REQUEST }
}
export const postTransactionEnquirySuccess = (response) => {
    return {
        type: ActionTypes.POST_TRANSACTION_ENQUIRY_SUCCESS,
        payload: response
    }
}
export const postTransactionEnquiryFailed = () => {
    return {
        type: ActionTypes.POST_TRANSACTION_ENQUIRY_FAILED,
    }
}

export const postSendEmailRequest = () => {
    return { type: ActionTypes.POST_SEND_EMAIL_REQUEST }
}
export const postSendEmailSuccess = (response) => {
    return {
        type: ActionTypes.POST_SEND_EMAIL_SUCCESS,
        payload: response
    }
}
export const postSendEmailFailed = () => {
    return {
        type: ActionTypes.POST_SEND_EMAIL_FAILED,
    }
}

export const postCancelTransactionRequest = () => {
    return { type: ActionTypes.POST_CANCEL_TRANSACTION_REQUEST }
}
export const postCancelTransactionSuccess = (response) => {
    return {
        type: ActionTypes.POST_CANCEL_TRANSACTION_SUCCESS,
        payload: response
    }
}
export const postCancelTransactionFailed = () => {
    return {
        type: ActionTypes.POST_SEND_EMAIL_FAILED,
    }
}

export const postConfirmTransferRequest = () => {
    return { type: ActionTypes.POST_CONFIRM_TRANSFER_REQUEST }
}
export const postConfirmTransferSuccess = (response) => {
    return {
        type: ActionTypes.POST_CONFIRM_TRANSFER_SUCCESS,
        payload: response
    }
}
export const postConfirmTransferFailed = () => {
    return {
        type: ActionTypes.POST_CONFIRM_TRANSFER_FAILED,
    }
}

export const getInvoiceDetailsRequest = () => {
    return { type: ActionTypes.GET_INVOICE_DETAILS_REQUEST }
}
export const getInvoiceDetailsSuccess = (response) => {
    return {
        type: ActionTypes.GET_INVOICE_DETAILS_SUCCESS,
        payload: response
    }
}
export const getInvoiceDetailsFailed = () => {
    return {
        type: ActionTypes.GET_INVOICE_DETAILS_FAILED,
    }
}