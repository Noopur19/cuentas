export const setLocalData = async(name, value) => {
    await localStorage.setItem(name,value)
}
export const setLocalDataJSON = async(name, value) => {
    await localStorage.setItem(name,JSON.stringify(value))
}
export const getLocalData = (name) => {
    return localStorage.getItem(name)
}
export const removeLocalData = (name) => {
    return localStorage.removeItem(name)
}