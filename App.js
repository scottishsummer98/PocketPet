import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import PetSelectionScreen from "./src/screens/PetSelectionScreen";
import PetScreen from "./src/screens/PetScreen";
import { Provider } from "react-redux";
import myStore from "./src/redux/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={myStore}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: "PocketPet" }}
          />
          <Stack.Screen
            name="PetSelectionScreen"
            component={PetSelectionScreen}
            options={{ title: "Select a Pet" }}
          />
          <Stack.Screen
            name="PetScreen"
            component={PetScreen}
            options={{ title: "Your Pet" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
