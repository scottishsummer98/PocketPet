import * as actionTypes from "./actionTypes";

// export const greetPet = () => ({ type: actionTypes.GREET_PET });
// export const feedPet = () => ({ type: actionTypes.FEED_PET });
// export const playPet = () => ({ type: actionTypes.PLAY_PET });
// export const trickPet = () => ({ type: actionTypes.TRICK_PET });
export const selectPet = (petType, petName) => ({
  type: actionTypes.SELECT_PET,
  payload: { petType, petName },
});
// export const updatePetStats = (hunger, happiness, isAlive) => ({
//   type: actionTypes.UPDATE_PET_STATS,
//   payload: { hunger, happiness, isAlive },
// });
// export const resetPet = () => ({ type: actionTypes.RESET_PET });
