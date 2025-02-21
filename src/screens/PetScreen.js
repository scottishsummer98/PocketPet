import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";

const PetScreen = ({
  petType,
  petName,
  hunger,
  happiness,
  isAlive,
  petImages,
}) => {
  if (!petType || !petName) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No pet selected. Please go back.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {isAlive
          ? `${petName} the ${petType}`
          : `${petName} the ${petType} died`}
      </Text>
      <Image
        source={petImages[petType]?.greet} // Safely access pet image
        style={styles.petImage}
      />

      {isAlive && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Greet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
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
          <Button color={"white"} title="Restart" onPress={() => {}} />
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

export default connect(mapStateToProps)(PetScreen);
