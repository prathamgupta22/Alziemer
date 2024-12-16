import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PatientRegister = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRegister = () => {
    navigation.navigate("Login");
  };

  return (
    <View contentContainerStyle={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require("../../../assets/topVector.png")}
          style={styles.topImage}
        />
      </View>

      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Register for Patient</Text>
        <Text style={styles.signInText}>Create patient account</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name={"user"}
          size={24}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          placeholderTextColor="#B0B0B0"
          value={firstname}
          onChangeText={setFirstname}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name={"user"}
          size={24}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          placeholderTextColor="#B0B0B0"
          value={lastname}
          onChangeText={setLastname}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name={"envelope"}
          size={24}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="#B0B0B0"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name={"lock"}
          size={24}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={isPasswordVisible ? "eye" : "eye-slash"}
            size={24}
            color={"#9A9A9A"}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name={"calendar"}
          size={24}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Date of Birth"
          placeholderTextColor="#B0B0B0"
          value={dob}
          onChangeText={setDob}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name={"home"}
          size={24}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Address"
          placeholderTextColor="#B0B0B0"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name={"phone"}
          size={24}
          color={"#9A9A9A"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone Number"
          placeholderTextColor="#B0B0B0"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={require("../../../assets/image.png")}
          style={{ resizeMode: "contain", height: 180, right: 82 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
  },
  topImageContainer: {
    alignItems: "center",
  },
  topImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  helloContainer: {
    marginVertical: 16,
  },
  helloText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    color: "#2C3E50",
  },
  signInText: {
    textAlign: "center",
    fontSize: 16,
    color: "#7F8C8D",
    fontWeight: "600",
    marginTop: 5,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 10,
    marginHorizontal: 40,
    marginBottom: 10,
    elevation: 4,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#34495E",
    paddingVertical: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  buttonContainer: {
    marginHorizontal: 40,
    marginTop: 16,
    borderRadius: 4,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#bf00ff",
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  alreadyAccountText: {
    color: "#34495E",
    fontSize: 14,
  },
  loginText: {
    color: "#bf00ff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PatientRegister;
