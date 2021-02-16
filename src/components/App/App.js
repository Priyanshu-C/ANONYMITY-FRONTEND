import { useEffect } from "react";
import Welcome from "../Welcome/Welcome";
import ChatScreen from "../ChatScreen/ChatScreen";

//redux imports
import { connect } from "react-redux";
import { logIn, logOut, setUser, setUserAvatarName } from "../../actions";

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
                {loggedIn ? <ChatScreen /> : <Welcome />}
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
