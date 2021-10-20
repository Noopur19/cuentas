import { getLocalData } from './cache'

export const getUser = () => {
    return { }
}
export const getToken = () => {
    return getLocalData('accessToken')
}