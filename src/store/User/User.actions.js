import { userType } from "../../types/index";

import { nanoid } from "nanoid";

export const signInUser = (data) => (dispatch) => {
  const userID = nanoid();
  dispatch({ type: userType.SIGNIN.Success, payload: { data, userID } });
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: userType.LOGOUT.Success });
  localStorage.clear();
};
