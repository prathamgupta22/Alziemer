import React, { useState } from "react";
import {API_URL} from '@env'
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [agency, setAgency] = useState("");
  const [phone, setPhone] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [load, setLoad] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const pickImage = async () => {
    // Ask for permission to access the gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log("image", image);
    }
  };
  // console.log(firstname,lastname,email,password,agency,address,phone)
  const handleRegister = async () => {
    setLoad(true);
    try {
      if (
        !firstname ||
        !lastname ||
        !email ||
        !password ||
        !address ||
        !agency ||
        !phone ||
        !image
      ) {
        ToastAndroid.show("All fields are required", ToastAndroid.LONG);
        return;
      }

      const formdata = new FormData();
      formdata.append("role", "caretaker");
      formdata.append("lastname", lastname);
      formdata.append("firstname", firstname);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("address", address);
      formdata.append("agency", agency);
      formdata.append("phone", phone);

      // Check if an image was selected
      if (image) {
        // Convert image URI to a file object
        const response = await fetch(image);

        const blob = await response.blob();
        formdata.append("profile", {
          uri: image,
          type: blob.type || "image/jpeg", // Ensure correct MIME type is sent
          name: "profile.jpg", // You can change the name if needed
        });
      }

      const res = await axios.post(
        `${API_URL}/api/v1/user/register`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res?.data.success) {
        ToastAndroid.show(res.data.message, ToastAndroid.LONG);
        navigation.navigate("Login");
        setLoad(false);
      } else {
        ToastAndroid.show(res?.data.message, ToastAndroid.LONG);
        setLoad(false);
      }
    } catch (error) {
      ToastAndroid.show(error.response?.data.message, ToastAndroid.LONG);
      setLoad(false);
    } finally {
      setLoad(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topImageContainer}>
          <Image
            source={require("../../assets/topVector.png")}
            style={styles.topImage}
          />
        </View>

        <View style={styles.profileImageContainer}>
          <Image
            source={
              image ? { uri: image } : require("../../assets/default.png")
            }
            style={styles.profileImage}
          />
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.pickImageText}>Choose Profile Image</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.helloContainer}>
          <Text style={styles.helloText}>Register as Caretaker</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            placeholderTextColor="#B0B0B0"
            value={firstname}
            onChangeText={setFirstname}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            placeholderTextColor="#B0B0B0"
            value={lastname}
            onChangeText={setLastname}
          />
        </View>

        <View style={styles.inputContainer}>
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
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#B0B0B0"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <Text onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            {isPasswordVisible ? "Hide" : "Show"}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Address"
            placeholderTextColor="#B0B0B0"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Agency"
            placeholderTextColor="#B0B0B0"
            value={agency}
            onChangeText={setAgency}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Phone Number"
            placeholderTextColor="#B0B0B0"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleRegister}
          disabled={load}
        >
          <Text style={styles.button}>
            {load ? <ActivityIndicator color="black" /> : "Register"}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginTextContainer}>
          <Text style={styles.alreadyAccountText}>
            Already have an account?{" "}
          </Text>
          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </View>

        {/* Optional: Additional image or content */}
        <View style={styles.bottomImageContainer}>
          <Image
            source={require("../../assets/image.png")}
            style={styles.bottomImage}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
  },
  topImageContainer: {
    alignItems: "center",
  },
  topImage: {
    width: "100%",
    height: 110,
    resizeMode: "cover",
  },
  profileImageContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  pickImageText: {
    color: "#bf00ff",
    fontSize: 14,
    marginTop: 10,
  },
  helloContainer: {
    marginVertical: 15,
  },
  helloText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "900",
    color: "#36454F",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 8,
    marginHorizontal: 40,
    marginBottom: 9,
    elevation: 3,
    alignItems: "center",
    paddingHorizontal: 10,
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#34495E",
    paddingVertical: 9,
  },
  eyeIcon: {
    marginLeft: 10,
    color: "#9A9A9A",
    fontSize: 16,
  },
  buttonContainer: {
    marginHorizontal: 40,
    marginTop: 16,
    borderRadius: 4,
    overflow: "hidden",
    zIndex: 1,
  },
  button: {
    backgroundColor: "#bf00ff",
    borderRadius: 4,
    paddingVertical: 12,
    textAlign: "center",
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
  bottomImageContainer: {
    position: "absolute",
    bottom: -20,
    left: -40,
  },
  bottomImage: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
});

export default RegisterScreen;
