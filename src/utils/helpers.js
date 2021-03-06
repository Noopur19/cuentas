/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
import { getLocalData, setLocalData } from './cache'
import ReactHtmlParser from 'react-html-parser';
import { TRANSLATIONS_EN }  from 'translations/locales/en'
import { TRANSLATIONS_ES } from 'translations/locales/es'
import _ from 'lodash'
import history from 'utils/history'
import { ROUTES } from 'constants/AppRoutes';
import { SET_STEP } from 'constants/app'
var CryptoJS = require('crypto-js');

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
export const getIncommHeaders = () => {
    const incommHeaders =  getLocalData('incomm_headers') && JSON.parse(getLocalData('incomm_headers')) || {}
    const user = getUser()
    const appHeaders = {
        'x-knetikcloud-date': new Date(),
        'x-knetikcloud-channel': 'WEB',
        'x-knetikcloud-ip': localStorage.ip,
        'x-knetikcloud-username': user?.username,
        'x-knetikcloud-gpscoordinates': localStorage?.latlong || '37.79-122.41',
        'x-knetikcloud-appname': 'Cuentas',
        'x-knetikcloud-ipaddress': '181.198.203.52'
    }
    const headerData =  _.merge(incommHeaders,appHeaders)
    return headerData

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
        return status;
    }
}

export const getCountryName = (countries, code) => {
    const country = countries?.filter((item) => item?.currency[ 0 ].country_cd === code)
    return country && country[ 0 ]?.country
}

export const getStateByCode = (countries,states,address) => {
    const state =  states.filter((item) => item?.data && item?.data[ 0 ]?.state_cd === address.state )[ 0 ] || {}
    return state?.state || ''

}
export const getWUStore = (stores) => {
    return stores && stores?.result?.filter((item) => item.id === 418)[ 0 ]
}

export const deliveryTypeRequestPayload = (data, incomeDetail) => {
    const accountDetail = incomeDetail?.accountDetail
    const myWUNumber  = getLocalData('myWUNumberTemp')
    let receiver = {}
    if(data.givenName && data.paternalName && data.maternalName) {
        receiver = {
            first_name: data?.givenName || '',
            paternal_name: data?.paternalName || '',
            maternal_name: data?.maternalName || '',
            country_iso_code: data?.country && JSON.parse(data?.country)?.currency[ 0 ]?.country_cd,
            state: data?.state && JSON.parse(data?.state).state,
            city: data?.city,
        }
    } else {
        receiver = {
            first_name: data?.firstName || '' ,
            middle_name: data?.middleName || '',
            last_name: data?.lastName || '',
            country_iso_code: data?.country && JSON.parse(data?.country)?.currency[ 0 ]?.country_cd,
            state: data?.state && JSON.parse(data?.state).state,
            city: data?.city,
        }
    }

    return{
        sender: {
            country_iso_code: 'US',
            currency_iso_code: 'USD',
            bank_account: {
                name: 'Cuentas',
                account_number: accountDetail?.spendingAccount?.accountNumber,
                routing_number: accountDetail?.spendingAccount?.routingNumber,
                account_type: 'CheckingAcct',
            },
            mywu_number: myWUNumber || '',
        },
        receiver: receiver,
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
        return '???'
    default:
        return '';
    }
}

export const getLocalByTitle = (title) => {
    const localType = locale()
    const TRANSLATION = localType == 'es' ? TRANSLATIONS_ES: TRANSLATIONS_EN
    return TRANSLATION[ title ]

}

export const getWUContactInfo = (val1,val2,val3,val4,val5,val6,val7) => {
    return locale() == 'en' ? `For questions or complaints about Western Union, contact: \nSending customer State regulatory name: ${ val1 } \nSending customer state regulatory phone #1: ${ val2 } \nSending customer state regulatory phone #2: ${ val3 } \nState regulatory agency website url: ${ val4 } \nConsumer Financial Protection Bureau CFPB phone #1: ${ val5 }\nCFPB phone #2: ${ val6 }\nCFPB website url: ${ val7 } \n` :
        `Si tiene preguntas o quejas sobre Western Union, comun??quese con:\n Nombre regulador del estado del cliente que env??a: ${ val1 }\nEnv??o de tel??fono reglamentario del estado del cliente n. #1: ${ val2 }\nEnv??o de tel??fono reglamentario del estado del cliente #2: ${ val3 }\nURL del sitio web de la agencia reguladora estatal: ${ val4 }\nTel??fono CFPB de la Oficina de Protecci??n Financiera del Consumidor #1: ${ val5 }\nTel??fono CFPB #2: ${ val6 }\nURL del sitio web de Safpub: ${ val7 } \n`
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

const getTotalFees = paymentDetails => {
    const fee = _.get(paymentDetails, 'fees');
    const transferFee = !_.isEmpty(fee)
        ? parseFloat(_.get(fee, 'base_charges', 0)) +
        parseFloat(_.get(fee, 'delivery_charges', 0)) +
        parseFloat(_.get(fee, 'other_charges', 0)) +
        parseFloat(_.get(fee, 'charges', 0))
        : 0;
    return parseInt(transferFee) > 0 ? parseInt(transferFee) / 100 : 0;
};

const getTotalTaxes = paymentDetails => {
    const taxes = _.get(paymentDetails, 'taxes');
    const taxAmount = !_.isEmpty(taxes)
        ? parseFloat(_.get(taxes, 'municipal_tax', 0)) +
        parseFloat(_.get(taxes, 'state_tax', 0)) +
        parseFloat(_.get(taxes, 'county_tax', 0))
        : 0;
    return parseInt(taxAmount) > 0 ? parseInt(taxAmount) / 100 : 0;
};

const getPrincipalAmount = paymentDetails => {
    const principalAmount = _.get(
        paymentDetails,
        'origination.principal_amount',
        0,
    );
    return parseInt(principalAmount) > 0 ? parseInt(principalAmount) / 100 : 0;
};

const getPromotionalDiscount = paymentDetails => {
    const promotionDiscount = _.get(paymentDetails, 'promotion.discount', 0);
    return parseInt(promotionDiscount) > 0
        ? parseInt(promotionDiscount) / 100
        : 0;
};

const getOtherFee = otherFee => {
    if (_.isEmpty(otherFee) || otherFee !== 0 ) {
        return parseInt(otherFee) > 0 ? parseInt(otherFee) / 100 : 0;
    }
    return 0;
};
export const getAccessTokenBytes = (bytes) => {
    try{
        return bytes.toString(CryptoJS.enc.Utf8);

    } catch(e) {
        history.push('/error')
    }
}
export const getTotalAmount = (paymentDetails, otherFee = 0) => {
    if (_.isEmpty(paymentDetails)) {
        return 0;
    }
    return (
        getPrincipalAmount(paymentDetails) +
      getTotalFees(paymentDetails) +
      getTotalTaxes(paymentDetails) +
      getOtherFee(otherFee) -
      getPromotionalDiscount(paymentDetails)
    );
};

export const getErrorInsuff = (val) => {
    return locale() === 'en' ? `Insufficient balance after adding all charges. Total payable amount after adding all charges will be ${ val }` :
        `Saldo insuficiente despu??s de sumar todos los cargos. El monto total a pagar despu??s de agregar todos los cargos ser?? ${ val }`
}
export const getTrasactionTypeOnHandle = (type='left') => {
    return type === 'left' ? 'WMN' : 'WMF'
}
export const getCloseText = () => {
    return  locale() === 'en' ? 'Close' : 'Cerrar'
}
export const getCancelTransfer = () => {
    return locale() === 'en' ?  'Cancel Transfer' :  'Cancelar transferencia'
}

export const isIOSDevice = () => {
    const navigator = window.navigator
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}

export const replaceNaN = (val) => {
    return isNaN(val) ? '' : val
}

export const onlyNumberNormalization = ( val ) => {
    return  val.toString().replace(/[^0-9.]/g,'')
}

export const getLocalDataMyWuNumber = () => {
    const user  = getUser()
    return user?.additional_properties?.western_union?.map?.wu_number?.value
}

export const redirectForSteps = (path, dispatch, step ) => {
    if(step ===1 ){
        history.push(ROUTES.PROTECT_FORM)
    }else if(step == 2 ){
        dispatch({
            type: SET_STEP,
            step: 1
        })
    }else if(step === 3){
        dispatch({
            type: SET_STEP,
            step: 2
        })
    }else if(step === 4){
        dispatch({
            type: SET_STEP,
            step: 3
        })
    }
}

export const redirectWithPrefix = (path) => {
    if(path?.match(new RegExp('^/transaction-history\/\\d'))){
        history.push(ROUTES.TRANSACTION_HISTORY)
    }
}
export const navigateBackForApp = (path, dispatch, step) => {
    switch(path){
    case ROUTES.ROOT:
        return null
    case ROUTES.PROTECT_FORM:
        history.push(ROUTES.ROOT)
        break;
    case ROUTES.RECEIVER_DETAILS:
        redirectForSteps(path,dispatch, step)
        break;
    case ROUTES.SUCCESS_PAGE:
        dispatch({
            type: SET_STEP,
            step: 4
        })
        history.push(ROUTES.RECEIVER_DETAILS)
        break;
    case ROUTES.ERROR_PAGE:
        return null
    case ROUTES.TRANSACTION_HISTORY:
        history.push(ROUTES.RECEIVER_DETAILS)
        break;
    default:
        redirectWithPrefix(path)
        break
    }
}

export const getPhoneNumberFormat = (number) => {
    if (_.isEmpty(number)) {
        return '';
    }
    if (number.length === 10) {
        var cleaned = ('' + number).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return match[ 1 ] + '-' + match[ 2 ] + '-' + match[ 3 ];
        }
    }
    return number;
}