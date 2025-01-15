import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  StyleSheet,
} from "react-native";
import { playSound } from "../utils/playSound";

const petImages = {
  Cat: {
    greet: require("../../assets/pets/Cat_greet.gif"),
    feed: require("../../assets/pets/Cat_feed.gif"),
    play: require("../../assets/pets/Cat_play.gif"),
    tricks: [
      require("../../assets/pets/Cat_trick1.gif"),
      require("../../assets/pets/Cat_trick2.gif"),
      require("../../assets/pets/Cat_trick3.gif"),
    ],
  },
  Dog: {
    greet: require("../../assets/pets/Dog_greet.gif"),
    feed: require("../../assets/pets/Dog_feed.gif"),
    play: require("../../assets/pets/Dog_play.gif"),
    tricks: [
      require("../../assets/pets/Dog_trick1.gif"),
      require("../../assets/pets/Dog_trick2.gif"),
      require("../../assets/pets/Dog_trick3.gif"),
    ],
  },
  Parrot: {
    greet: require("../../assets/pets/Parrot_greet.gif"),
    feed: require("../../assets/pets/Parrot_feed.gif"),
    play: require("../../assets/pets/Parrot_play.gif"),
    tricks: [
      require("../../assets/pets/Parrot_trick1.gif"),
      require("../../assets/pets/Parrot_trick2.gif"),
      require("../../assets/pets/Parrot_trick3.gif"),
    ],
  },
  Shark: {
    greet: require("../../assets/pets/Shark_greet.gif"),
    feed: require("../../assets/pets/Shark_feed.gif"),
    play: require("../../assets/pets/Shark_play.gif"),
    tricks: [
      require("../../assets/pets/Shark_trick1.gif"),
      require("../../assets/pets/Shark_trick2.gif"),
      require("../../assets/pets/Shark_trick3.gif"),
    ],
  },
  Monkey: {
    greet: require("../../assets/pets/Monkey_greet.gif"),
    feed: require("../../assets/pets/Monkey_feed.gif"),
    play: require("../../assets/pets/Monkey_play.gif"),
    tricks: [
      require("../../assets/pets/Monkey_trick1.gif"),
      require("../../assets/pets/Monkey_trick2.gif"),
      require("../../assets/pets/Monkey_trick3.gif"),
    ],
  },
};

const PetScreen = ({ route, navigation }) => {
  const { petType, petName } = route.params;

  const [isAlive, setIsAlive] = useState(true);
  const [hunger, setHunger] = useState(50);
  const [happiness, setHappiness] = useState(50);
  const [currentImage, setCurrentImage] = useState(petImages[petType].greet); // Set initial image to "greet"

  const getRandomTrickImage = () => {
    const tricks = petImages[petType].tricks;
    const randomIndex = Math.floor(Math.random() * tricks.length);
    return tricks[randomIndex];
  };

  useEffect(() => {
    if (hunger <= 0 || happiness <= 0) {
      setIsAlive(false);
      setCurrentImage(require("../../assets/pets/Pet_dead.gif"));
    }
  }, [hunger, happiness]);

  const greetPet = () => {
    playSound(petType, "greet");
    setCurrentImage(petImages[petType].greet);
    Alert.alert(`Hello, ${petName}!`);
  };

  const feedPet = () => {
    setHunger((prev) => Math.min(Math.max(prev + 10, 0), 100));
    setCurrentImage(petImages[petType].feed);
    playSound(petType, "feed");
  };

  const performTrick = () => {
    setHappiness((prev) => Math.max(prev - 5, 0));
    setHunger((prev) => Math.max(prev - 10, 0));
    const trickImage = getRandomTrickImage();
    setCurrentImage(trickImage);
    playSound(petType, "trick");
    Alert.alert(`${petName} is performing a trick!`);
  };

  const playWithPet = () => {
    setHappiness((prev) => Math.min(Math.max(prev + 5, 0), 100));
    setCurrentImage(petImages[petType].play);
    playSound(petType, "greet");
  };

  const handleRestart = () => {
    setIsAlive(true);
    setHunger(50);
    setHappiness(50);
    setCurrentImage(petImages[petType].greet);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {isAlive
          ? `${petName} the ${petType}`
          : `${petName} the ${petType} died`}
      </Text>

      <Image
        source={
          isAlive ? currentImage : require("../../assets/pets/Pet_dead.gif")
        }
        style={styles.petImage}
      />

      {isAlive && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={greetPet}
            style={styles.actionButton}
            disabled={!isAlive}
          >
            <Text style={styles.buttonText}>Greet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={feedPet}
            style={styles.actionButton}
            disabled={!isAlive}
          >
            <Text style={styles.buttonText}>Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={playWithPet}
            style={styles.actionButton}
            disabled={!isAlive}
          >
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={performTrick}
            style={styles.actionButton}
            disabled={!isAlive}
          >
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
});

export default PetScreen;
