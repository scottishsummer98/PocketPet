import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import PetSelectionScreen from "./src/screens/PetSelectionScreen";
import PetScreen from "./src/screens/PetScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          options={{ title: "PocketPet" }}
          component={HomeScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="PetSelectionScreeen"
          component={PetSelectionScreen}
          options={{ title: "Select a Pet" }}
        ></Stack.Screen>
        <Stack.Screen
          name="PetScreen"
          component={PetScreen}
          options={{ title: "Your Pet" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
