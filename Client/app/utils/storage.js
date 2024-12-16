import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("@auth_token", token);
  } catch (e) {
    console.log("Error storing token", e);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@auth_token");
    return token !== null ? token : null;
  } catch (e) {
    console.log("Error retrieving token", e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("@auth_token");
  } catch (e) {
    console.log("Error removing token", e);
  }
};
