import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const LogoutPatient = ({ navigation }) => {
  const handleLogout = () => {
    navigation.navigate("Login");
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
    borderRadius: 75,
    borderColor: "gray",
    overflow: "hidden",
    width: 150,
    height: 150,
    marginBottom: 20,
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#BF40BF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LogoutPatient;