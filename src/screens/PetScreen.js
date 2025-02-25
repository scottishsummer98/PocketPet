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
import { connect } from "react-redux";
import { playSound } from "../utils/playSound";
import { updatePetStats, resetPet } from "../redux/actionCreators";

const mapStateToProps = (state) => ({
  auth: state.auth,
  pet: state.pet,
});

const mapDispatchToProps = (dispatch) => ({
  updatePetStats: (hunger, happiness, isAlive) =>
    dispatch(updatePetStats(hunger, happiness, isAlive)),
  resetPet: () => dispatch(resetPet()),
});

const PetScreen = (props) => {
  const [currentImage, setCurrentImage] = useState(
    props.pet.petImages[props.pet.petType]?.greet
  );

  const { hunger, happiness, isAlive, petType, petName } = props.pet;

  useEffect(() => {
    setCurrentImage(props.pet.petImages[props.pet.petType]?.greet);
  }, [props.pet.petType]);

  useEffect(() => {
    if (hunger <= 0 || happiness <= 0) {
      props.updatePetStats(0, 0, false);
      setCurrentImage(require("../../assets/pets/Pet_dead.gif"));
    }
  }, [hunger, happiness, isAlive, props.updatePetStats]);

  useEffect(() => {
    if (isAlive !== undefined) {
      props.updatePetStats(hunger, happiness, isAlive);
    }
  }, [hunger, happiness, isAlive]);

  const getRandomTrickImage = () => {
    const tricks = props.pet.petImages[petType]?.tricks;
    return tricks ? tricks[Math.floor(Math.random() * tricks.length)] : null;
  };

  const handleResetPet = () => {
    props.resetPet();
    setTimeout(() => {
      props.navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    }, 100); // Short delay before navigating
  };

  const greetPet = () => {
    playSound(petType, "greet");
    setCurrentImage(props.pet.petImages[petType]?.greet);
    Alert.alert(`Hello, ${petName}!`);
  };

  const feedPet = () => {
    const newHunger = Math.min(hunger + 10, 100);
    props.updatePetStats(newHunger, happiness, isAlive);
    setCurrentImage(props.pet.petImages[petType]?.feed);
    playSound(petType, "feed");
  };

  const playWithPet = () => {
    const newHappiness = Math.min(happiness + 5, 100);
    props.updatePetStats(hunger, newHappiness, isAlive);
    setCurrentImage(props.pet.petImages[petType]?.play);
    const sounds = ["greet", "trick"];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    playSound(petType, randomSound);
  };

  const performTrick = () => {
    const newHunger = Math.max(hunger - 10, 0);
    const newHappiness = Math.max(happiness - 5, 0);
    props.updatePetStats(newHunger, newHappiness, isAlive);
    setCurrentImage(getRandomTrickImage());
    playSound(petType, "trick");
    Alert.alert(`${petName} is performing a trick!`);
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
          <Text style={styles.infoText}>Energy: {hunger}</Text>
          <Text style={styles.infoText}>Happiness: {happiness}</Text>
        </View>
      )}

      {!isAlive && (
        <View style={styles.restartButtonContainer}>
          <Button color={"white"} title="Restart" onPress={handleResetPet} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PetScreen);
