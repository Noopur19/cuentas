export const MESSAGE = {
    REQUIRE: (value) => `Please enter ${ value }`,
    VALID_ENTER: (value) => `Please enter valid ${ value }`,
}
export const GET_STEP_PROGRESSBAR = 'GET_STEP_PROGRESSBAR'
export const INCOMM_HEADERS = {
    'x-knetikcloud-date': 'Fri Oct 22 2021 18:58:55 GMT+0530 (IST)',
    'x-knetikcloud-channel': 'app',
    'x-knetikcloud-ip': '223.236.47.216',
    'x-knetikcloud-username': undefined,
    'x-knetikcloud-uuid': '2DCC36E8-5B19-4DC2-BEF5-B0A1A1EB8E74',
    'x-knetikcloud-osname': 'ios',
    'x-knetikcloud-osversion': '15.0',
    'x-knetikcloud-gpscoordinates': '37.79 -122.41',
    'x-knetikcloud-displayresolution': '414x896',
    'x-knetikcloud-physicalmemory': '16.00',
    'x-knetikcloud-appname': 'Cuentas',
    'x-knetikcloud-appversion': '2.6.0',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const STATIC_URLS = {
    registerLink:  'https://www.westernunion.com/mywu/us/',
    privacyPolicy: (locale) =>  `https://www.westernunion.com/us/${ locale }/privacy-statement.html`,
    termsAndConditions:  (locale) => `https://www.westernunion.com/us/${ locale }/legal/terms-conditions.html`,
    faqs : (locale) => `https://www.westernunion.com/us/${ locale }/privacy-statement.html`,

}