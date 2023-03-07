export const ADD_TO_FAV = "ADD_TO_FAV";

export const addToFav = (element) => {
  return (dispatch, getState, i) => {
    const currentState = getState();
    dispatch({ type: ADD_TO_FAV, payload: element });
  };
};
