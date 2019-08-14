import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import filmReducer from "./filmReducer";

export default combineReducers({
  errors: errorReducer,
  film: filmReducer
});
