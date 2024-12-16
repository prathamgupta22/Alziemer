import React from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import PatientHome from "./patient/PatientHome";
import AdminHome from "./Admin/AdminHome";
import CaretakerHome from "./caretaker/CaretakerHome";

const Home = () => {
  const route = useRoute();
  const { userRole } = route.params;

  const renderHomeScreen = () => {
    switch (userRole) {
      case "admin":
        return <AdminHome />;
      case "patient":
        return <PatientHome />;
      case "caretaker":
        return <CaretakerHome />;
      default:
        return (
          <View>
            <Text>Invalid role</Text>
          </View>
        );
    }
  };

  return <View style={{ flex: 1 }}>{renderHomeScreen()}</View>;
};

export default Home;
