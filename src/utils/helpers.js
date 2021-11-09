/* eslint-disable camelcase */
import { getLocalData, setLocalData } from './cache'
import ReactHtmlParser from 'react-html-parser';

export const getUser = () => {
    return getLocalData('user') && JSON.parse(getLocalData('user'))
}

export const getToken = () => {
    return getLocalData('accessToken')
}

export const getArticles = () => {
    const articles = getLocalData('articles') && JSON.parse(getLocalData('articles'))
    return articles
}

export const getArticle = (id) => {
    const articles = getArticles()
    return articles?.filter((article) => article.id === id )[ 0 ]
}
export const locale = () => {
    return getLocalData('locale')
}
export const setLocale = (val) => {
    return setLocalData('locale',val)
}
export const getParseHtmlArticle = (id) => {
    const article = getArticle(`${ locale() }_${ id }`)
    return article?.body ? ReactHtmlParser(article?.body) : null
}

export const getTransactionStatus = (status) => {
    switch (status) {
    case 'AVAILABLE':
        return 'Cancel'
    case 'CANCELLED':
        return 'Cancelled';
    case 'PAID':
        return 'Refunded';
    default:
        return '';
    }
}

export const getCountryName = (countries, code) => {
    const country = countries?.filter((item) => item?.currency[ 0 ].country_cd === code)
    return country && country[ 0 ]?.country
}

export const getWUStore = (stores) => {
    return stores && stores?.result?.filter((item) => item.name === 'Western Union by Cuentas')[ 0 ]
}

export const deliveryTypeRequestPayload = (data, incomeDetail) => {
    const accountDetail = incomeDetail?.accountDetail
    const receiver = {
        first_name: data?.firstName || '' ,
        middle_name: data?.middleName || '',
        last_name: data?.lastName || '',
        country_iso_code: data?.country && JSON.parse(data?.country)?.currency[ 0 ]?.country_cd,
        state: data?.state,
        city: data?.city,
    }

    return{
        sender: {
            country_iso_code: 'US',
            currency_iso_code: 'USD',
            bank_account: {
                name: 'Cuentas',
                account_number: accountDetail?.spendingAccount?.accountNumber,
                routing_number: accountDetail?.spendingAccount?.routingNumber,
                account_type: 'CheckingAcct', //TODO
            },
        },
        receiver: receiver,
        mywu_number: null,
        selectedDeliveryType: null,
        wu_product: data?.deliveryType && JSON.parse(data?.deliveryType)?.wu_product || {},
        transaction_type: data?.deliveryType && JSON.parse(data?.deliveryType)?.transaction_type || '',
        payment_details: data?.deliveryType && JSON.parse(data?.deliveryType)?.payment_details || {},
    }
}
export const getCurrencySymbol = (currencyCode) => {
    switch (currencyCode) {
    case 'USD':
        return '$'
    case 'EUR':
        return '€'
    default:
        return '$';
    }
}

export const confirmTransferRequestPayload = (data, finalAmount, stores) => {
    const wustore = getWUStore(stores)
    return{
        item_notes: wustore && wustore?.additional_properties?._thumbnail.url,
        paid_amount: finalAmount,
        price_override: finalAmount,
        sku: wustore && wustore?.skus[ 0 ]?.sku,
        transaction_details: 'not sure',
        transaction_type: 'not sure',
        template: 'wu_invoice',
        additional_properties: {
            amount: {
                type: 'text',
                value: finalAmount,
            },
            retail_url: {
                type: 'text',
                value: wustore && wustore?.skus[ 0 ]?.additional_properties?.retail_url?.value || null,
            },
            sku_discount: {
                type: 'text',
                value:  wustore && wustore?.skus[ 0 ]?.additional_properties?.sku_discount?.value || null,
            },
        },
        paymentVendor: 'incomm',
        sender: data?.sender || {},
        receiver: data?.receiver || {},
        wu_product: data?.wu_product || {},
        wu_transaction_type: data?.transaction_type,
        payment_details: data?.payment_details || {},
        temp_transaction_id: data?.temp_transaction_id || '' ,
        transaction_digest: data?.transaction_digest || '',
        date_time: data?.date_time || '',
        df_detail: data?.df_detail || ''
    }
}