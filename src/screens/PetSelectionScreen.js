import React from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const petAvatars = [
  { type: "Cat", source: require("../../assets/pets/Cat_greet.gif") },
  { type: "Dog", source: require("../../assets/pets/Dog_greet.gif") },
  { type: "Parrot", source: require("../../assets/pets/Parrot_greet.gif") },
  { type: "Shark", source: require("../../assets/pets/Shark_greet.gif") },
  { type: "Monkey", source: require("../../assets/pets/Monkey_greet.gif") },
];

const PetSelectionScreen = () => {
  return (
    <View style={styles.container}>
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

      <View style={styles.selectionContainer}>
        <TextInput
          placeholder="Enter Pet Name"
          value={petName}
          onChangeText={setPetName}
          style={styles.input}
        />
      </View>

      <Button title="Confirm" />
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

  selectionContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});

export default PetSelectionScreen;
