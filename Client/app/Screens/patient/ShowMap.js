import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { ItemList } from "../../data/ItemList";
import { LocationList } from "../../data/LocationList";

// Helper function to get location based on ref
const getLocationByRef = (ref) => {
  const location = LocationList.find((location) => location.ref === ref);
  return location ? location : { item_name: "Unknown Location", img_url: "" };
};

const ShowMap = () => {
  // Rendering each item with its respective location
  const renderItem = ({ item }) => {
    const location = getLocationByRef(item._id);

    return (
      <View style={styles.itemContainer}>
        {/* Item Card */}
        <View style={styles.card}>
          <Image source={{ uri: item.img_url }} style={styles.cardImage} />
          <Text style={styles.cardText}>{item.item_name}</Text>
        </View>

        {/* "is on" text */}
        <Text style={styles.inBetweenText}>is on</Text>

        {/* Location Card */}
        <View style={styles.card}>
          <Image source={{ uri: location.img_url }} style={styles.cardImage} />
          <Text style={styles.cardText}>{location.item_name}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Items and Their Locations</Text>
      <FlatList
        data={ItemList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    alignItems: "center",
    width: "30%",
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
    objectFit: "contain",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
  },
  inBetweenText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3498db",
  },
});

export default ShowMap;