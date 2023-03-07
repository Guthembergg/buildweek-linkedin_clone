export const ADD_TO_FAV = "ADD_TO_FAV";

export const addToFav = (element) => {
  return (dispatch, getState, i) => {
    const currentState = getState();
    console.log(currentState);
    if (currentState.favourites.findIndex((job) => job === element) === -1) {
      dispatch({ type: ADD_TO_FAV, payload: element });
    }
  };
};
