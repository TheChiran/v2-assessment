import { combineReducers } from "redux";
import authReducer from "./authReducer";
import studentReducer from "./studentReducer";

const rootReducer = combineReducers({
  student: studentReducer,
  auth: authReducer,
});

export default rootReducer;
