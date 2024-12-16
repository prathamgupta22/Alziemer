import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const Map = () => {
  const [image, setImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);

  const handleImageSelection = async (setImageFn) => {
    Alert.alert(
      "Select Image Source",
      "Choose from the following options:",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!result.canceled) {
              setImageFn(result.assets[0].uri);
            }
          },
        },
        {
          text: "Pick from Library",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!result.canceled) {
              setImageFn(result.assets[0].uri);
            }
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title="Pick or Take a Photo for Item"
        onPress={() => handleImageSelection(setImage)}
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button
        title="Set Location for Item (Pick/Take Photo)"
        onPress={() => handleImageSelection(setSecondImage)}
      />
      {secondImage && (
        <Image source={{ uri: secondImage }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 20,
  },
  button: {
    marginVertical: 10,
  },
});

export default Map;