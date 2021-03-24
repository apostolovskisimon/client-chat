import { combineReducers } from "redux";
import userReducer from "./User/User.reducer";

const appReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
