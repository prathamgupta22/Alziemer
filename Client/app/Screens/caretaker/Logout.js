import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { logoutUser } from "../../Services/authService.js";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const Logout = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logoutUser();
    // Reset the navigation stack and navigate to the login screen
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/logout.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>Are you sure you want to logout?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  imageContainer: {
    borderRadius: (Math.min(width, height) * 0.4) / 2,
    borderColor: "gray",
    overflow: "hidden",
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: height * 0.03,
  },

  logo: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: width * 0.05,
    color: "#333",
    marginBottom: height * 0.05,
    textAlign: "center",
    paddingHorizontal: width * 0.1,
  },

  button: {
    backgroundColor: "#BF40BF",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.3,
    borderRadius: 5,
    elevation: 5,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: width * 0.045,
    fontWeight: "600",
  },
});

export default Logout;
