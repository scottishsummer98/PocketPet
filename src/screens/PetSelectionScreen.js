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
import { connect } from "react-redux";
import { selectPet, anonAuth } from "../redux/actionCreators";

const PetSelectionScreen = (props) => {
  const navigation = useNavigation();
  const [selectedPet, setSelectedPet] = useState(null);
  const [petName, setPetName] = useState("");

  const { petImages } = props;

  if (!petImages) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: Pet images not found.</Text>
      </View>
    );
  }

  const handleSelectPet = (petType) => {
    setSelectedPet({ type: petType, source: petImages[petType]?.greet });
  };

  const handleConfirmSelection = () => {
    if (petName && selectedPet) {
      props.selectPet(selectedPet.type, petName);
      props.anonAuth();
      navigation.navigate("PetScreen");
    }
  };

  return (
    <View style={styles.container}>
      {!selectedPet && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
        >
          {Object.keys(petImages).map((petType, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectPet(petType)}
              style={styles.carouselItem}
            >
              <Image source={petImages[petType]?.greet} style={styles.avatar} />
              <Button
                title={petType}
                onPress={() => handleSelectPet(petType)}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

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
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

const mapStateToProps = (state) => ({
  petImages: state.pet.petImages,
});

const mapDispatchToProps = (dispatch) => ({
  anonAuth: () => dispatch(anonAuth()),
  selectPet: (petType, petName) => dispatch(selectPet(petType, petName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PetSelectionScreen);
