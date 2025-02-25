import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/PocketPetLogo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to PocketPet!</Text>
      <Button
        title="Start"
        onPress={() => navigation.navigate("PetSelectionScreen")}
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
  logo: { width: 200, height: 200, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
});

export default HomeScreen;
