import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Items from "./Items";
import ShowMap from "./ShowMap";
import LogoutPatient from "./LogoutPatient";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const PatientHome = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Items") {
            iconName = focused ? "list" : "list-outline";
          }
          if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
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
      <Tab.Screen name="Items" component={Items} />
      <Tab.Screen name="Map" component={ShowMap} />
      <Tab.Screen name="Logout" component={LogoutPatient} />
    </Tab.Navigator>
  );
};

export default PatientHome;