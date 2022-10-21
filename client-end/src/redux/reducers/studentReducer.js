import { CLEAR_DATA, SET_ACCESS_TOKEN, SET_STUDENT_DATA } from "../constants";

const initialState = {};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENT_DATA:
      return {
        ...state,
        student: action.data,
      };
    case CLEAR_DATA:
      return {
        initialState,
      };
  }
  return state;
};

export default studentReducer;
