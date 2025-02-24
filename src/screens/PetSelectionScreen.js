import React, { useState } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { createPetStats, anonAuth } from "../redux/actionCreators";

const mapStateToProps = (state) => ({
  auth: state.auth,
  pet: state.pet,
});

const mapDispatchToProps = (dispatch) => ({
  anonAuth: () => dispatch(anonAuth()),
  createPetStats: (petType, petName) =>
    dispatch(createPetStats(petType, petName)),
});

const PetSelectionScreen = (props) => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [petName, setPetName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectPet = (petType) => {
    setSelectedPet(petType);
  };

  const handleConfirmSelection = async () => {
    props.createPetStats(selectedPet, petName);
    setTimeout(() => {
      setLoading(false);
      props.navigation.navigate("PetScreen");
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="teal" />
      ) : selectedPet === null ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
        >
          {Object.keys(props.pet.petImages).map((petType) => (
            <TouchableOpacity
              key={petType}
              onPress={() => handleSelectPet(petType)}
              style={styles.carouselItem}
            >
              <Image
                source={props.pet.petImages[petType]?.greet}
                style={styles.avatar}
              />
              <Button
                title={petType}
                onPress={() => handleSelectPet(petType)}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.selectionContainer}>
          <Image
            source={props.pet.petImages[selectedPet]?.greet}
            style={styles.selectedAvatar}
          />
          <TextInput
            placeholder="Enter Pet Name"
            value={petName}
            onChangeText={(text) => setPetName(text.toUpperCase())}
            style={styles.input}
          />
          <Button
            title="Confirm"
            onPress={handleConfirmSelection}
            disabled={!selectedPet || !petName}
          />
        </View>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(PetSelectionScreen);
