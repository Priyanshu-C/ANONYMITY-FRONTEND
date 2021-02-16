import { combineReducers } from "redux";
import chatDataReducer from "./chatDataReducer";

const loginStatusReducer = (loggedIn = false, actions) => {
    if (actions.type === "SIGN_IN") {
        return true;
    }
    if (actions.type === "SIGN_OUT") {
        return false;
    }
    return loggedIn;
};
const userDataReducer = (userData = null, actions) => {
    if (actions.type === "SET_USER") {
        // console.log(actions.payload);
        return actions.payload;
    }
    if (actions.type === "UNSET_USER") {
        return null;
    }
    return userData;
};
const userAvatarNameReducer = (userData = null, actions) => {
    // console.log(actions);
    if (actions.type === "SET_USER_AVATAR_NAME") {
        // console.log(actions.payload);
        return actions.payload;
    }
    if (actions.type === "UNSET_USER_AVATAR_NAME") {
        return null;
    }
    return userData;
};

export default combineReducers({
    loginStatus: loginStatusReducer,
    userData: userDataReducer,
    chatData: chatDataReducer,
    userAvatarName: userAvatarNameReducer,
});
