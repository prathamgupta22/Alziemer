import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import PatientDetail from "./PatientDetail";
import Mapping from "./Mapping";

const Tab = createBottomTabNavigator();

const Detail = ({ route }) => {
  const { patient } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Details") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Mapping") {
            iconName = focused ? "map" : "map-outline";
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
      <Tab.Screen
        name="Details"
        component={PatientDetail}
        initialParams={{ patient }}
      />
      <Tab.Screen
        name="Mapping"
        component={Mapping}
        initialParams={{ patient }}
      />
    </Tab.Navigator>
  );
};

export default Detail;