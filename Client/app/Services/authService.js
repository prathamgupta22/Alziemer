import axios from "axios";
import { API_URL } from "@env";
import { storeToken, removeToken } from "../utils/storage.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/user/login`, {
      email,
      password,
    });

    if (res.data.success && res.data.user) {
      const token = res.data.token;
      await storeToken(token);
      await AsyncStorage.setItem("@user_role", res.data.user.role);
      return { success: true, message: res.data.message, user: res.data.user };
    }

    return { success: false, message: res.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data.message };
  }
};

export const logoutUser = async () => {
  await removeToken();
};
