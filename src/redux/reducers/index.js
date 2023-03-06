const initialState = {
  myProfile: [],
  myExperience: {},
  newPost: "",
  deletedPost: "",
  modifiedPost: "",
  modifiedBio: {},
  modifiedInfo: {},
  deletedExperience: "",
  modifiedExperience: "",
  query: "",
};

const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MY_PROFILE":
      return { ...state, myProfile: action.payload };
    case "ADD_EXP":
      return { ...state, myExperience: action.payload };
    case "NEW_POST":
      return { ...state, newPost: action.payload };
    case "DELETE_POST":
      return { ...state, deletedPost: action.payload };
    case "MODIFIED_POST":
      return { ...state, modifiedPost: action.payload };
    case "MODIFIED_BIO":
      return { ...state, modifiedBio: action.payload };
    case "MODIFIED_INFO":
      return { ...state, modifiedInfo: action.payload };
    case "DELETED_EXPERIENCE":
      return { ...state, deletedExperience: action.payload };
    case "MODIFIED_EXPERIENCE":
      return { ...state, modifiedExperience: action.payload };
    case "SEARCH_QUERY":
      return { ...state, query: action.payload };
    case "CLEAR_SEARCH":
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default MainReducer;
