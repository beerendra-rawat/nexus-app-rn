import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAuthToken = async (idToken) => {
    try {
        console.log("saving the token id.....")
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


export const saveAuthObject = async (authObject) => {
    try {
        await AsyncStorage.setItem(
            "AUTH_DATA",
            JSON.stringify(authObject)
        );
        console.log("Auth object saved successfully");
    } catch (error) {
        console.error("Error saving auth object:", error);
    }
};

export const getAuthObject = async () => {
    try {
        const data = await AsyncStorage.getItem("AUTH_DATA");
        if (data) {
            const parsedData = JSON.parse(data);
            console.log("Fetched Auth Object:", parsedData);
            return parsedData;
        }
        return null;
    } catch (error) {
        console.error("Error fetching auth object:", error);
    }
};