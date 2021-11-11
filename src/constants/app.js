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

}