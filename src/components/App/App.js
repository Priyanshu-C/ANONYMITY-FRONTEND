//Essentials
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Welcome from "../Welcome/Welcome";
import ChatScreen from "../ChatScreen/ChatScreen";

//redux imports
import { connect } from "react-redux";
import { logIn, logOut, setUser, setUserAvatarName } from "../../actions";
import LandingPage from "../LandingPage/LandingPage";

function App({
    loggedIn,
    userData,
    logIn,
    logOut,
    setUser,
    setUserAvatarName,
}) {
    useEffect(() => {
        const user = localStorage.getItem("userData");
        const userAvatarName = localStorage.getItem("userAvatarName");
        if (user) {
            setUser(user);
        }
        if (userAvatarName) {
            setUserAvatarName(userAvatarName);
        }
        // eslint-disable-next-line
    }, []);

    //ChatScreen

    return (
        // <Router>
        <div className="app">
            <div className="app_body">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/main">
                            {loggedIn ? <ChatScreen /> : <Welcome />}
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>

        // </Router>
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
})(App);
