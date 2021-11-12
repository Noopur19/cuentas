export const MESSAGE = {
    REQUIRE: (value) => `Please enter ${ value }`,
    VALID_ENTER: (value) => `Please enter valid ${ value }`,
}
export const GET_STEP_PROGRESSBAR = 'GET_STEP_PROGRESSBAR'

export const STATIC_URLS = {
    registerLink:  'https://www.westernunion.com/mywu/us/',
    privacyPolicy: (locale) =>  `https://www.westernunion.com/us/${ locale }/privacy-statement.html`,
    termsAndConditions:  (locale) => `https://www.westernunion.com/us/${ locale }/legal/terms-conditions.html`,
    faqs : (locale) => `https://www.westernunion.com/us/${ locale }/privacy-statement.html`,
    APP_ANDROID_URL: 'https://play.google.com/store/apps/details?id=com.knetik.cuentas.ngh',
    APP_IOS_URL: 'https://apps.apple.com/us/app/cuentas-prepaid-mastercard/id1483994878?ls=1',
    APP_ANDROID_BACK_URL: 'https://hello.cuentas.com/apps',
    APP_IOS_BACK_URL: 'CuentasApp://'

}

export const GET_ERROR_FIELD = {
    ERROR: (error) =>`${ error?.response?.data?.result[ 0 ]?.cause?.root?.Envelope?.Body?.Fault?.detail[ 'error-reply' ].error }`
}
