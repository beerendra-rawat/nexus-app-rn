import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAuthToken = async (idToken) => {
    try {
        await AsyncStorage.setItem("Auth_Token", idToken)
        console.log("authToken save -> ", idToken)
    } catch (error) {
        console.log("Error saving auth tokenId: ", error)
    }
}

export const getAuthToken = async () => {
    try {
        const token = await AsyncStorage.getItem("Auth_Token");
        console.log("Retrieved auth token:", token);
        return token;
    } catch (error) {
        console.error("Error getting auth token:", error);
        return null;
    }
}

export const clearAuthToken = async () => {
    try {
        await AsyncStorage.removeItem("Auth_Token");
        console.log("Auth token cleared");
    } catch (error) {
        console.error("Error clearing auth token:", error);
    }
};


export const setAuthData = async (data) => {
    try {
        console.log("setAuthData -> saving data:", data)
        await AsyncStorage.setItem("Auth_Data", JSON.stringify(data))
        console.log("setAuthData -> data save successfully")
    }
    catch (error) {
        console.log("setAuData -> error saving data:", error)
    }
}

export const getAuthData = async () => {
    try {
        const data = await AsyncStorage.getItem("Auth_Data")
        console.log("getAuthData -> raw data:", data);

        const parsedData = data ? JSON.parse(data) : null
        console.log("getAuthData -> parese data: ", parsedData)

        return parsedData
    }
    catch (error) {
        console.error("getAuthData -> error reading data:", error);
        return null;
    }
}

export const clearAuthData = async () => {
    try {
        console.log("🧹 clearAuthData → removing Auth_Data");

        await AsyncStorage.removeItem("Auth_Data");

        console.log("clearAuthData -> data removed");
    } catch (error) {
        console.error("clearAuthData -> error removing data:", error);
    }
};