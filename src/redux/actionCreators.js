import * as actionTypes from "./actionTypes";
import axios from "axios";
import { baseUrl } from "./baseUrl";
import { API_KEY } from "./apiKey";

const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      idToken: idToken,
      localId: localId,
    },
  };
};

const refreshIdToken = async (refreshToken) => {
  const refreshUrl = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
  try {
    const response = await axios.post(refreshUrl, {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });
    return response.data.id_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

export const anonAuth = () => async (dispatch) => {
  const authURL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

  try {
    const res = await axios.post(authURL + API_KEY);
    dispatch(authSuccess(res.data.idToken, res.data.localId));

    const refreshToken = res.data.refreshToken;
    setInterval(async () => {
      try {
        const newIdToken = await refreshIdToken(refreshToken);
        dispatch(authSuccess(newIdToken, res.data.localId));
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }, 3500 * 1000);

    return true;
  } catch (err) {
    console.error("Error during authentication:", err);
    return false;
  }
};

export const createPetStats = (petType, petName) => {
  return (dispatch, getState) => {
    let hunger = getState().pet.hunger;
    let happiness = getState().pet.happiness;
    let isAlive = getState().pet.isAlive;
    const userId = getState().auth?.localId;

    axios
      .put(
        `${baseUrl}/users/${userId}/petStats.json`,
        { petType, petName, hunger, happiness, isAlive },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        dispatch({
          type: actionTypes.CREATE_PET_STATS,
          payload: { petType, petName, hunger, happiness, isAlive },
        });
      })
      .catch((error) => {
        console.error("Error updating pet stats:", error);
      });
  };
};
export const updatePetStats = (hunger, happiness, isAlive) => {
  return (dispatch, getState) => {
    const userId = getState().auth?.localId;

    axios
      .patch(
        `${baseUrl}/users/${userId}/petStats.json`,
        { hunger, happiness, isAlive },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        dispatch({
          type: actionTypes.UPDATE_PET_STATS,
          payload: { hunger, happiness, isAlive },
        });
      })
      .catch((error) => {
        console.error("Error updating pet stats:", error);
      });
  };
};
export const fetchPetStats = () => async (dispatch, getState) => {
  const userId = getState().auth?.localId;
  if (!userId) return null;

  try {
    const response = await axios.get(
      `${baseUrl}/users/${userId}/petStats.json`
    );
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching pet stats:", error);
    return null;
  }
};
export const resetPet = () => ({
  type: actionTypes.RESET_PET,
});
