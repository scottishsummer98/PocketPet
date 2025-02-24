import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { anonAuth, fetchPetStats } from "../redux/actionCreators";
const mapStateToProps = (state) => ({
  user: state.auth,
  pet: state.pet,
});

const mapDispatchToProps = (dispatch) => ({
  anonAuth: () => dispatch(anonAuth()),
  fetchPetStats: () => dispatch(fetchPetStats()),
});
const HomeScreen = (props) => {
  const [loading, setLoading] = useState(false);
  console.log(props);

  const handleStartPress = async () => {
    setLoading(true);
    if (!props.user.idToken) {
      const isAuthSuccessful = await props.anonAuth();
      if (!isAuthSuccessful) {
        setLoading(false);
        return;
      }
    }
    const petStats = await props.fetchPetStats();
    setTimeout(() => {
      setLoading(false);
      props.navigation.navigate(petStats ? "PetScreen" : "PetSelectionScreen");
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="teal" />
      ) : (
        <View>
          <Image
            source={require("../../assets/PocketPetLogo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome to PocketPet!</Text>
          <Button title="Start" onPress={handleStartPress} />
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
  logo: { width: 200, height: 200, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
