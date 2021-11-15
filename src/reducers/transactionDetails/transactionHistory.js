import { ActionTypes } from 'actions/transaction-details/actionTypes'
const initialState = {
    loading: false,
    enquiryLoading: false,
    emailLoading: false,
    cancelLoading: false,
    confirmLoading: false,
    invoices: [],
    enquiryDetails: {},
    cancelDetails: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
    case ActionTypes.GET_TRANSACTION_HISTORY_REQUEST:
        return { ...state, loading: true };
    case ActionTypes.GET_TRANSACTION_HISTORY_SUCCESS:
        return { ...state, loading: false , invoices: action.payload };
    case ActionTypes.GET_TRANSACTION_HISTORY_FAILED:
        return { ...state, loading: false };
    case ActionTypes.POST_TRANSACTION_ENQUIRY_REQUEST:
        return { ...state, enquiryLoading: true };
    case ActionTypes.POST_TRANSACTION_ENQUIRY_SUCCESS:
        return { ...state, enquiryLoading: false , enquiryDetails: action.payload };
    case ActionTypes.POST_TRANSACTION_ENQUIRY_FAILED:
        return { ...state, enquiryLoading: false };
    case ActionTypes.POST_SEND_EMAIL_REQUEST:
        return { ...state, emailLoading: true };
    case ActionTypes.POST_SEND_EMAIL_SUCCESS:
        return { ...state, emailLoading: false };
    case ActionTypes.POST_SEND_EMAIL_FAILED:
        return { ...state, emailLoading: false };
    case ActionTypes.POST_CANCEL_TRANSACTION_REQUEST:
        return { ...state, cancelLoading: true };
    case ActionTypes.POST_CANCEL_TRANSACTION_SUCCESS:
        return { ...state, cancelLoading: false , cancelDetails: action.payload };
    case ActionTypes.POST_CANCEL_TRANSACTION_FAILED:
        return { ...state, cancelLoading: false };
    case ActionTypes.POST_CONFIRM_TRANSFER_REQUEST:
        return { ...state, confirmLoading: true };
    case ActionTypes.POST_CONFIRM_TRANSFER_SUCCESS:
        return { ...state, confirmLoading: false , confirmDetails: action.payload };
    case ActionTypes.POST_CONFIRM_TRANSFER_FAILED:
        return { ...state, confirmLoading: false };
    case ActionTypes.GET_INVOICE_DETAILS_REQUEST:
        return { ...state, invoiceLoading: true };
    case ActionTypes.GET_INVOICE_DETAILS_SUCCESS:
        return { ...state, invoiceLoading: false , invoiceDetails: action.payload };
    case ActionTypes.GET_INVOICE_DETAILS_FAILED:
        return { ...state, invoiceLoading: false };
    default:
        return state;
    }
};