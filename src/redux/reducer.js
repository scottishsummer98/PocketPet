import * as actionTypes from "./actionTypes";
import { combineReducers } from "redux";

const userReducer = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const petReducer = (
  petState = {
    petType: null,
    petName: "",
    hunger: 50,
    happiness: 50,
    isAlive: true,
    petImages: {
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
    },
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SELECT_PET:
      return {
        ...petState,
        petType: action.payload.petType,
        petName: action.payload.petName,
      };
    default:
      return petState;
  }
};

export const reducer = combineReducers({
  user: userReducer,
  pet: petReducer,
});
