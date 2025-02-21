import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { createOrUpdatePetStats, resetPet } from "../redux/actionCreators";
import { playSound } from "../utils/playSound";

const PetScreen = ({
  petType,
  petName,
  hunger,
  happiness,
  isAlive,
  petImages,
  createOrUpdatePetStats,
  resetPet,
}) => {
  const [currentImage, setCurrentImage] = useState(petImages[petType]?.greet);
  const navigation = useNavigation();
  useEffect(() => {
    if (hunger <= 0 || happiness <= 0) {
      createOrUpdatePetStats(0, 0, false); // Update the stats when the pet dies
      setCurrentImage(require("../../assets/pets/Pet_dead.gif"));
    }
  }, [hunger, happiness, createOrUpdatePetStats]);

  const getRandomTrickImage = () => {
    const tricks = petImages[petType]?.tricks;
    return tricks ? tricks[Math.floor(Math.random() * tricks.length)] : null;
  };

  const greetPet = () => {
    playSound(petType, "greet");
    setCurrentImage(petImages[petType]?.greet);
    Alert.alert(`Hello, ${petName}!`);
  };

  const feedPet = () => {
    createOrUpdatePetStats(Math.min(hunger + 10, 100), happiness, isAlive);
    setCurrentImage(petImages[petType]?.feed);
    playSound(petType, "feed");
  };

  const playWithPet = () => {
    createOrUpdatePetStats(hunger, Math.min(happiness + 5, 100), isAlive);
    setCurrentImage(petImages[petType]?.play);
    const sounds = ["greet", "trick"];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    playSound(petType, randomSound);
  };

  const performTrick = () => {
    createOrUpdatePetStats(
      Math.max(hunger - 10, 0),
      Math.max(happiness - 5, 0),
      isAlive
    );
    setCurrentImage(getRandomTrickImage());
    playSound(petType, "trick");
    Alert.alert(`${petName} is performing a trick!`);
  };

  const handleRestart = () => {
    resetPet();
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {isAlive
          ? `${petName} the ${petType}`
          : `${petName} the ${petType} died`}
      </Text>
      <Image source={currentImage} style={styles.petImage} />

      {isAlive && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={greetPet} style={styles.actionButton}>
            <Text style={styles.buttonText}>Greet</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={feedPet} style={styles.actionButton}>
            <Text style={styles.buttonText}>Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={playWithPet} style={styles.actionButton}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={performTrick} style={styles.actionButton}>
            <Text style={styles.buttonText}>Trick</Text>
          </TouchableOpacity>
        </View>
      )}

      {isAlive && (
        <View style={styles.petInfoContainer}>
          <Text style={styles.infoText}>Hunger: {hunger}</Text>
          <Text style={styles.infoText}>Happiness: {happiness}</Text>
        </View>
      )}

      {!isAlive && (
        <View style={styles.restartButtonContainer}>
          <Button color={"white"} title="Restart" onPress={handleRestart} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  headerText: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  petImage: { width: 150, height: 150, marginBottom: 20, borderRadius: 90 },
  actionsContainer: { flexDirection: "row", marginVertical: 20 },
  actionButton: {
    backgroundColor: "teal",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: { color: "white", fontSize: 16 },
  infoText: { fontSize: 18, marginTop: 10 },
  restartButtonContainer: {
    marginTop: 20,
    width: 200,
    backgroundColor: "teal",
    borderRadius: 5,
  },
  petInfoContainer: {
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

const mapStateToProps = (state) => ({
  petType: state.pet.petType,
  petName: state.pet.petName,
  hunger: state.pet.hunger,
  happiness: state.pet.happiness,
  isAlive: state.pet.isAlive,
  petImages: state.pet.petImages,
});

const mapDispatchToProps = {
  createOrUpdatePetStats,
  resetPet,
};

export default connect(mapStateToProps, mapDispatchToProps)(PetScreen);
