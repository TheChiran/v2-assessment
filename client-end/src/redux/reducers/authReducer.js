import { SET_ACCESS_TOKEN, SET_LOADING_STATUS, SET_LOGIN } from "../constants";

const initialState = {
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.data,
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        token: action.data,
      };
  }
  return state;
};

export default authReducer;
