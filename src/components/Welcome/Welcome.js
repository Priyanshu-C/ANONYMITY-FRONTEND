import { Button } from "@material-ui/core";
import React from "react";
import "./Welcome.scss";
import axios from "../../axios";

//redux
import { connect } from "react-redux";
import { logIn, logOut, setUser, setUserAvatarName } from "../../actions";

function Welcome({
    state,
    setState,
    loggedIn,
    logIn,
    logOut,
    setUser,
    userData,
    setUserAvatarName,
}) {
    const assignId = async () => {
        //connect with backend to create userId
        try {
            const user = await axios.get("/users/signup");
            localStorage.setItem("userData", JSON.stringify(user.data[0]));
            localStorage.setItem(
                "userAvatarName",
                JSON.stringify(user.data[1])
            );
            setUser(JSON.stringify(user.data[0]));
            setUserAvatarName(JSON.stringify(user.data[1]));
        } catch (err) {
            console.log(`error creating user ${err}`);
        }
    };

    return (
        <div className="WelcomeContainer">
            <div className="WelcomeContainer__header">Anonymity</div>
            <div className="WelcomeContainer__login">
                <div className="WelcomeContainer__login__header">
                    <h1>Login</h1>
                    <p>Your Device is your way in.</p>
                </div>
                <div className="WelcomeContainer__login__button">
                    {userData ? (
                        <button
                            onClick={() => {
                                logIn();
                            }}
                            style={{ width: "14rem", fontSize: "1.5rem" }}
                            className="welcome-container__LetsGo-button"
                        >
                            Let's Get In
                        </button>
                    ) : (
                        <button
                            onClick={assignId}
                            style={{ width: "14rem", fontSize: "1.5rem" }}
                            className="welcome-container__LetsGo-button"
                        >
                            Get Started
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { loggedIn: state.loginStatus, userData: state.userData };
};
export default connect(mapStateToProps, {
    logIn: logIn,
    logOut: logOut,
    setUser,
    setUserAvatarName,
})(Welcome);
