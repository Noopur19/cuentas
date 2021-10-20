export const setLocalData = async(name, value) => {
    await localStorage.setItem(name,value)
}
export const getLocalData = (name) => {
    return localStorage.getItem(name)
}