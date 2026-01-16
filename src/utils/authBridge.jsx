import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAuthData = async (data) => {
    await AsyncStorage.setItem("Auth_Data", JSON.stringify(data))
}

export const getAuthData = async () => {
    const data = await AsyncStorage.getItem("Auth_Data")
    return data ? JSON.parse(data) : null
}

export const clearAuthData = async () => {
    await AsyncStorage.removeItem("Auth_Data")
}