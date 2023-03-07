import { ADD_TO_FAV } from "../actions";

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
  comment: {},
  modified_comment: "",
  delete_comment: "",
  commentId: {},
  seguiti: [],
  favourites: [],
  likes: [],
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
      return { ...state, query: "" };
    case "COMMENT":
      return { ...state, comment: action.payload };
    case "MODIFIED_COMMENT":
      return { ...state, modified_comment: action.payload };
    case "DELETE_COMMENT":
      return { ...state, delete_comment: action.payload };
    case "COMMENT_ID":
      return { ...state, commentId: action.payload };
    case "FOLLOW":
      return { ...state, seguiti: [...state.seguiti, action.payload] };
    case ADD_TO_FAV:
      return { ...state, favourites: [...state.favourites, action.payload] };
    case "CLEAR_FAV":
      return { ...state, favourites: [] };
    case "REMOVE_TO_FAV":
      return {
        ...state,
        favourites: [
          ...state.favourites.filter((e, i) => e !== action.payload),
        ],
      };
    case "REMOVE_TO_FOLLOW":
      return {
        ...state,
        seguiti: [...state.seguiti.filter((e) => e !== action.payload)],
      };
    case "LIKE":
      return {
        ...state,
        likes: [...state.likes, action.payload],
      };
    case "REMOVE_LIKE":
      return {
        ...state,
        likes: [...state.likes.filter((e) => e !== action.payload)],
      };
    default:
      return state;
  }
};

export default MainReducer;
