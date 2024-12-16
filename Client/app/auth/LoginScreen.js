import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../Services/authService.js";
import Icon from "react-native-vector-icons/FontAwesome";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const data = [
  { key: "1", value: "admin" },
  { key: "2", value: "patient" },
  { key: "3", value: "caretaker" },
];

const LoginScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [load, setLoad] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignIn = async () => {
    try {
      setLoad(true);
      if (!selected || !email || !password) {
        ToastAndroid.show("All fields are required", ToastAndroid.LONG);
        setLoad(false); // Make sure to stop loading here
        return;
      }

      const res = await loginUser(email, password);
      if (res.success) {
        // Storing role and token, then navigating
        await AsyncStorage.setItem("@user_role", selected);
        ToastAndroid.show(res.message, ToastAndroid.LONG);

        // Navigate based on user role
        if (selected === "admin") {
          navigation.navigate("AdminHome");
        } else if (selected === "caretaker") {
          navigation.navigate("CaretakerHome");
        } else if (selected === "patient") {
          navigation.navigate("PatientHome");
        } else {
          navigation.navigate("Home", { userRole: selected });
        }
      } else {
        ToastAndroid.show(res.message, ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    } finally {
      setLoad(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require("../../assets/topVector.png")}
          style={styles.topImage}
        />
      </View>

      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Welcome Back</Text>
        <Text style={styles.signInText}>Sign in to your account</Text>
      </View>

      <View style={{ marginTop: height * 0.02 }}>
        <View style={styles.selectListContainer}>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            placeholder="Select Role"
            boxStyles={styles.selectBox}
            inputStyles={styles.selectInput}
            dropdownStyles={styles.dropdownStyles}
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
      </View>

      <Text style={styles.forgot}>Forgot your password?</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn}
          disabled={load}
        >
          <Text style={styles.buttonText}>
            {load ? <ActivityIndicator /> : "Sign In"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loginTextContainer}>
        <Text style={styles.alreadyAccountText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={require("../../assets/image.png")}
          style={styles.bottomImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
  },
  topImageContainer: {
    alignItems: "center",
  },
  topImage: {
    width: "100%",
    height: height * 0.2, // Adjusts based on screen height
    resizeMode: "cover",
  },
  helloContainer: {
    marginTop: height * 0.05,
    marginBottom: height * 0.03,
  },
  helloText: {
    textAlign: "center",
    fontSize: width * 0.09,
    fontWeight: "700",
    color: "#2C3E50",
  },
  signInText: {
    textAlign: "center",
    fontSize: width * 0.04,
    color: "#7F8C8D",
    fontWeight: "600",
    marginTop: height * 0.005,
  },
  selectListContainer: {
    marginHorizontal: width * 0.1,
    marginBottom: height * 0.015,
  },
  selectBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    padding: width * 0.04,
    borderColor: "#ECECEC",
    borderWidth: 1,
  },
  selectInput: {
    fontSize: width * 0.04,
    color: "#34495E",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 4,
    marginHorizontal: width * 0.1,
    elevation: 4,
    marginVertical: height * 0.015,
    alignItems: "center",
    paddingHorizontal: width * 0.03,
  },
  inputIcon: {
    marginRight: width * 0.02,
  },
  textInput: {
    flex: 1,
    fontSize: width * 0.04,
    color: "#34495E",
    paddingVertical: height * 0.015,
  },
  eyeIcon: {
    marginLeft: width * 0.03,
  },
  forgot: {
    textAlign: "center",
    color: "#3498DB",
    fontSize: width * 0.04,
    marginVertical: height * 0.02,
  },
  buttonContainer: {
    marginHorizontal: width * 0.1,
    marginTop: height * 0.02,
    borderRadius: 4,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#bf00ff",
    borderRadius: 4,
    paddingVertical: height * 0.015,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.045,
    fontWeight: "600",
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.03,
  },
  alreadyAccountText: {
    color: "#34495E",
    fontSize: width * 0.04,
  },
  loginText: {
    color: "#bf00ff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  bottomImage: {
    resizeMode: "contain",
    height: height * 0.25,
    width: "80%",
    left: -200,
    alignSelf: "center",
  },
});

export default LoginScreen;
