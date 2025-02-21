import * as actionTypes from "./actionTypes";
import { API_KEY } from "./apiKey";
import { baseURL } from "./baseUrl";
import axios from "axios";

const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      idToken: idToken,
      localId: localId,
    },
  };
};

export const anonAuth = () => (dispatch) => {
  let authURL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  axios
    .post(authURL + API_KEY)
    .then((res) => {
      dispatch(authSuccess(res.data.idToken, res.data.localId));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const selectPet = (petType, petName) => ({
  type: actionTypes.SELECT_PET,
  payload: { petType, petName },
});

export const createOrUpdatePetStats = (hunger, happiness, isAlive) => {
  return (dispatch, getState) => {
    const state = getState();
    const userId = state.auth.localId;
    if (!userId) return;

    axios
      .get(`${baseURL}/pets/${userId}/petStats`)
      .then((response) => {
        if (response.status === 200) {
          return axios.put(
            `${baseURL}/pets/${userId}/petStats`,
            { hunger, happiness, isAlive },
            { headers: { "Content-Type": "application/json" } }
          );
        } else {
          return axios.post(
            `${baseURL}/pets/${userId}/petStats`,
            { hunger, happiness, isAlive },
            { headers: { "Content-Type": "application/json" } }
          );
        }
      })
      .then((updateResponse) => {
        if (updateResponse.status === 200 || updateResponse.status === 201) {
          dispatch({
            type: CREATE_OR_UPDATE_PET_STATS,
            payload: { hunger, happiness, isAlive },
          });
        }
      })
      .catch((error) => {
        console.error("Error creating/updating pet stats:", error);
      });
  };
};

export const resetPet = () => ({
  type: actionTypes.RESET_PET,
});
