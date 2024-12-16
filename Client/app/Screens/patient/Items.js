import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { ItemList } from "../../data/ItemList";
import { LocationList } from "../../data/LocationList";

const { width, height } = Dimensions.get("window");

const Items = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (item) => {
    const location = LocationList.find((location) => location.ref === item._id);
    setSelectedItem(location);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.img_url }} style={styles.image} />
      <Text style={styles.itemName}>
        {capitalizeFirstLetter(item.item_name)}
      </Text>
      <Text style={styles.getLocationText}>View Location</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>All Items</Text>
      <FlatList
        data={ItemList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      {selectedItem && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedItem.img_url }}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>{selectedItem.item_name}</Text>
              <Text style={styles.modalText}>
                This item is located at : {selectedItem.item_name}
              </Text>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f9f9f9",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
    letterSpacing: 1.5,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 15,
    marginBottom: 12,
    objectFit: "contain",
  },
  itemName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
  },
  getLocationText: {
    fontSize: 16,
    color: "#3498db",
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    width: width * 0.85,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalImage: {
    width: 180,
    height: 180,
    borderRadius: 15,
    marginBottom: 20,
    objectFit: "contain",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
  },
});

export default Items;