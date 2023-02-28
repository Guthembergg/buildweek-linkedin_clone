const initialState = {
  myProfile: [],
  myExperience: {},
};

const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MY_PROFILE":
      return { ...state, myProfile: action.payload };
    case "ADD_EXP":
      return { ...state, myExperience: action.payload };
    default:
      return state;
  }
};

export default MainReducer;
