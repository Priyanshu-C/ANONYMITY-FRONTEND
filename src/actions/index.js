import axios from "../axios";

let response = null;
export const logIn = () => {
    return {
        type: "SIGN_IN",
    };
};

export const logOut = () => {
    return {
        type: "SIGN_OUT",
    };
};

export const setUser = (userData) => {
    return {
        type: "SET_USER",
        payload: userData,
    };
};

export const setUserAvatarName = (userData) => {
    return {
        type: "SET_USER_AVATAR_NAME",
        payload: userData,
    };
};

export const fetchChatData = (userData) => {
    return async (dispatch) => {
        try {
            response = await axios.get(`/users/chatdata?userId=${userData}`);
        } catch (err) {
            console.log(err);
        }
        if (response.data.length !== 0) {
            dispatch({
                type: "FETCH_CHAT_DATA",
                payload: response.data,
            });
        }
    };
};
