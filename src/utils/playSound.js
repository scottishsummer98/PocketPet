import { Audio } from "expo-av";

const sounds = {
  Cat_feed: require("../../assets/sounds/Cat_feed.mp3"),
  Cat_greet: require("../../assets/sounds/Cat_greet.mp3"),
  Cat_trick: require("../../assets/sounds/Cat_trick.mp3"),
  Dog_feed: require("../../assets/sounds/Dog_feed.mp3"),
  Dog_greet: require("../../assets/sounds/Dog_greet.mp3"),
  Dog_trick: require("../../assets/sounds/Dog_trick.mp3"),
  Parrot_feed: require("../../assets/sounds/Parrot_feed.mp3"),
  Parrot_greet: require("../../assets/sounds/Parrot_greet.mp3"),
  Parrot_trick: require("../../assets/sounds/Parrot_trick.mp3"),
  Shark_feed: require("../../assets/sounds/Shark_feed.mp3"),
  Shark_greet: require("../../assets/sounds/Shark_greet.mp3"),
  Shark_trick: require("../../assets/sounds/Shark_trick.mp3"),
  Monkey_feed: require("../../assets/sounds/Monkey_feed.mp3"),
  Monkey_greet: require("../../assets/sounds/Monkey_greet.mp3"),
  Monkey_trick: require("../../assets/sounds/Monkey_trick.mp3"),
};

export const playSound = async (petType, action) => {
  try {
    const soundKey = `${petType}_${action}`;
    const soundFile = sounds[soundKey]; // Lookup in the static mapping

    if (!soundFile) {
      console.warn(`No sound found for: ${soundKey}`);
      return;
    }

    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.error(`Error playing sound: ${petType}_${action}`, error);
  }
};
