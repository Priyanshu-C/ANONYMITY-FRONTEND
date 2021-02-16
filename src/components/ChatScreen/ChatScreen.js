import React from "react";
import { useEffect, useState } from "react";
import axios from "../../axios";
import Sidebar from "../Sidebar/Sidebar";
import Chat from "../Chat/Chat";

//redux
import { connect } from "react-redux";
import { logIn, logOut, setUser, fetchChatData } from "../../actions";

// const { whyDidYouUpdate } = require('why-did-you-update');
// whyDidYouUpdate(React);

const ChatScreen = ({ userData, chatData, fetchChatData, dispatch }) => {
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedContactA, setSelectedContactA] = useState(null);
    const [chatDataFiltered, setChatDataFiltered] = useState();

    //Old Functionality

    // const addAndRefreshLocation = (userData) => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(async (data, err) => {
    //             const { lat, lon } = {
    //                 lat: data.coords.latitude,
    //                 lon: data.coords.longitude,
    //             };
    //             const res = await axios.post(`/users/addUserToRedis`, {
    //                 id: userData,
    //                 lat: lat,
    //                 lon: lon,
    //             });
    //             console.log(res.data);
    //         });
    //     }
    // };

    useEffect(() => {
        if (userData !== null) {
            fetchChatData(userData);
        }
        // addAndRefreshLocation(userData);
        // eslint-disable-next-line
    }, [userData]);

    useEffect(() => {
        const filtered =
            chatData &&
            chatData.map((data) => {
                return {
                    conversationId: data._id,

                    pair: data.pair,
                    messages: data.messages,
                };
            });
        setChatDataFiltered(filtered);
        let contacts = [];

        if (chatData) {
            contacts = chatData.map((item) => {
                let filteredContact = item.pair.filter(
                    (user) => user !== JSON.parse(userData)
                );

                return filteredContact;
            });
        }

        let userSpecificChatData = null;
        if (chatDataFiltered) {
            if (selectedContact) {
                userSpecificChatData = chatDataFiltered.filter((data) =>
                    data.pair.includes(selectedContact[0])
                );
            }
        }

    }, [chatData]);

    return (
        <>
            {/* <Sidebar contacts={contacts} selectedContact={selectedContact} setSelectedContact={setSelectedContact} />
    <Chat chatData={userSpecificChatData && userSpecificChatData[0]} selectedContact={selectedContact} />
     */}

            <div className="chat-page">
                <div className="chat-body">
                    <Sidebar
                        selectedContact={selectedContact}
                        setSelectedContact={setSelectedContact}
                        setSelectedContactA={setSelectedContactA}
                    />
                    <Chat
                        selectedContact={selectedContact}
                        selectedContactA={selectedContactA}
                    />
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return { userData: state.userData, chatData: state.chatData };
};

export default connect(mapStateToProps, {
    logIn: logIn,
    logOut: logOut,
    setUser,
    fetchChatData,
})(ChatScreen);
