import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";

const PatientDetail = ({ route }) => {
  const { patient } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>
          {patient.firstName} {patient.lastName}
        </Text>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.detail}>{patient.email}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.detail}>{patient.dateOfBirth}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.detail}>{patient.address}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.detail}>{patient.phoneNumber}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("addMap")}>
        <Text>Add mapping</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: "100%",
    alignSelf: "center",
    marginVertical: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    color: "#555",
    width: "40%",
  },
  detail: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    flexWrap: "wrap",
  },
});

export default PatientDetail;