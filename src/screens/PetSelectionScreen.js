import React, { useState } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const petAvatars = [
  { type: "Cat", source: require("../../assets/pets/Cat_greet.gif") },
  { type: "Dog", source: require("../../assets/pets/Dog_greet.gif") },
  { type: "Parrot", source: require("../../assets/pets/Parrot_greet.gif") },
  { type: "Shark", source: require("../../assets/pets/Shark_greet.gif") },
  { type: "Monkey", source: require("../../assets/pets/Monkey_greet.gif") },
];

const PetSelectionScreen = () => {
  const navigation = useNavigation();
  const [selectedPet, setSelectedPet] = useState(null);
  const [petName, setPetName] = useState("");

  const handleSelectPet = (petType) => {
    const pet = petAvatars.find((pet) => pet.type === petType);
    setSelectedPet(pet);
  };

  const handleConfirmSelection = () => {
    if (petName && selectedPet) {
      navigation.navigate("PetScreen", { petType: selectedPet.type, petName });
    }
  };

  return (
    <View style={styles.container}>
      {/* Hide the pet carousel after selecting a pet */}
      {!selectedPet && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
        >
          {petAvatars.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectPet(item.type)}
              style={styles.carouselItem}
            >
              <Image source={item.source} style={styles.avatar} />
              <Button
                title={item.type}
                onPress={() => handleSelectPet(item.type)}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Show selected pet and name input */}
      {selectedPet && (
        <View style={styles.selectionContainer}>
          <Image source={selectedPet.source} style={styles.selectedAvatar} />
          <TextInput
            placeholder="Enter Pet Name"
            value={petName}
            onChangeText={setPetName}
            style={styles.input}
          />
        </View>
      )}

      <Button
        title="Confirm"
        onPress={handleConfirmSelection}
        disabled={!petName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "70%",
    marginVertical: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  carouselContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  carouselItem: {
    padding: 10,
    alignItems: "center",
  },
  avatar: {
    width: 200,
    height: 200,
    marginBottom: 5,
    borderRadius: 90,
  },
  selectedAvatar: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  selectionContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});

export default PetSelectionScreen;
