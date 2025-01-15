import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const PetScreen = (route) => {
  const { petType, petName } = route.params;
  return (
    <View>
      <Text>
        {{ petName }} the {{ petType }}
      </Text>
    </View>
  );
};

export default PetScreen;
