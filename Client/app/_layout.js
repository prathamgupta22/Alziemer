import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./auth/RegisterScreen";
import PatientRegister from "./Screens/patient/PatientRegister";
import LoginScreen from "./auth/LoginScreen";
import Home from "./Screens/Home";
import CaretakerHome from "./Screens/caretaker/CaretakerHome";
import PatientHome from "./Screens/patient/PatientHome";
import AdminHome from "./Screens/Admin/AdminHome";
import PatientDetail from "./Screens/caretaker/PatientDetail";
import Detail from "./Screens/caretaker/Detail";
import Map from "./Screens/caretaker/Map";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const _layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("@auth_token");
        const role = await AsyncStorage.getItem("@user_role");
        if (token && role) {
          setIsLoggedIn(true);
          setUserRole(role ?? "default");
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.log("Error checking login status: ", e);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          userRole === "caretaker" ? (
            <Stack.Screen name="CaretakerHome" component={CaretakerHome} />
          ) : userRole === "patient" ? (
            <Stack.Screen name="PatientHome" component={PatientHome} />
          ) : userRole === "admin" ? (
            <Stack.Screen name="AdminHome" component={AdminHome} />
          ) : (
            <Stack.Screen
              name="Home"
              component={Home}
              initialParams={{ userRole }}
            />
          )
        ) : (
          // Render login-related screens without using fragments
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="PatientRegister" component={PatientRegister} />
          </>
        )}

        <Stack.Screen name="PatientDetail" component={PatientDetail} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="addMap" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default _layout;
