import { userType } from "../../types";

const initialState = {
  signedIn: false,
  user: {
    name: "",
    id: "",
  },
};

const userReducer = (state = initialState, action = {}) => {
  const { payload } = action;
  switch (action.type) {
    case userType.SIGNIN.Success:
      if (!localStorage.getItem("SIGNED_IN")) {
        localStorage.setItem(
          "SIGNED_IN",
          JSON.stringify({ name: payload.data, id: payload.userID })
        );
        return {
          ...state,
          signedIn: true,
          user: { ...state.user, name: payload.data, id: payload.userID },
        };
      } else {
        const userData = JSON.parse(localStorage.getItem("SIGNED_IN"));
        return {
          ...state,
          signedIn: true,
          user: { ...state.user, name: userData.name, id: userData.id },
        };
      }

    default:
      return state;
  }
};

export default userReducer;
