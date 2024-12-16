import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Mapping = ({ route }) => {
  const { patient } = route.params; // Get patient data from params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Patient Mapping</Text>
      <Text style={styles.description}>
        Mapping data for {patient.firstName} {patient.lastName}.
      </Text>
      {/* Add your mapping functionality here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {},
  description: {},
});
export default Mapping;