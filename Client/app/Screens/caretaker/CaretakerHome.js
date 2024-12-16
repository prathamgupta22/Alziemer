import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import PatientRegister from "../patient/PatientRegister";
import Logout from "./Logout";
import Allpatient from "./Allpatient";

const Tab = createBottomTabNavigator();

const CaretakerHome = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "All patient") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Register Patient") {
            iconName = focused ? "person-add" : "person-add-outline";
          } else if (route.name === "Logout") {
            iconName = focused ? "log-out" : "log-out-outline";
          }
          return <Icon name={iconName} size={29} color={color} />;
        },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          paddingTop: 5,
          fontSize: 14,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="All patient" component={Allpatient} />
      <Tab.Screen name="Register Patient" component={PatientRegister} />
      <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
  );
};

export default CaretakerHome;