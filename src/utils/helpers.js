/* eslint-disable camelcase */
import { getLocalData, setLocalData } from './cache'
import ReactHtmlParser from 'react-html-parser';
import { TRANSLATIONS_EN }  from 'translations/locales/en'
import { TRANSLATIONS_ES } from 'translations/locales/es'
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
export const getStateCd = (state) =>{
    const stateObj =  state && JSON.parse(state)
    return stateObj.city ? stateObj.city[ 0 ].state_cd : stateObj.data[ 0 ].state_cd
}

export const getStateName = (state) => {
    return state && JSON.parse(state)?.state
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
    return stores && stores?.result?.filter((item) => item.id === 418)[ 0 ]
}

export const deliveryTypeRequestPayload = (data, incomeDetail) => {
    const accountDetail = incomeDetail?.accountDetail
    const receiver = {
        first_name: data?.firstName || '' ,
        middle_name: data?.middleName || '',
        last_name: data?.lastName || '',
        country_iso_code: data?.country && JSON.parse(data?.country)?.currency[ 0 ]?.country_cd,
        state: data?.state && JSON.parse(data?.state).state,
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
        return '';
    }
}

export const getLocalByTitle = (title) => {
    const localType = locale()
    const TRANSLATION = localType == 'es' ? TRANSLATIONS_ES: TRANSLATIONS_EN
    return TRANSLATION[ title ]

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
                value: wustore && wustore?.skus[ 0 ]?.additional_properties?.retail_url?.value || '',
            },
            sku_discount: {
                type: 'text',
                value:  wustore && wustore?.skus[ 0 ]?.additional_properties?.sku_discount?.value || '',
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
        df_details: data?.df_details || {}
    }
}