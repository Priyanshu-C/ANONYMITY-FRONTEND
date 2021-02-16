import React, { useEffect, useMemo, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat/SidebarChat";
import { v4 as uuidV4 } from "uuid";
import AddIcon from "@material-ui/icons/Add";
import axios from "../../axios";
import { connect } from "react-redux";
import { fetchChatData } from "../../actions";
import { AvatarGenerator } from "random-avatar-generator";

//material
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: "70px",
        height: "70px",
        border: "3px solid black",
    },
}));

function Sidebar({
    userData,
    chatData,
    selectedContact,
    setSelectedContact,
    fetchChatData,
    userAvatarName,
    setSelectedContactA,
}) {
    const classes = useStyles();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        let contactList =
            chatData &&
            chatData.map((item) => {
                let filteredContact = item.pair.filter(
                    (user) => user !== JSON.parse(userData)
                );

                let filteredContactA = item.pairNames.filter(
                    (userA) => userA !== JSON.parse(userAvatarName)
                );
                return [filteredContact, filteredContactA];
            });

        setContacts(contactList);
    }, [chatData, userData]);

    const addRandomUser = async () => {
        console.log("hello");
        const radius = 5000000;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (data, err) => {
                const { lat, lon } = {
                    lat: data.coords.latitude,
                    lon: data.coords.longitude,
                };
                const res = await axios.get(
                    `/users/getRandomUser?lat=${lat}&lon=${lon}&radius=${radius}&id=${userData}`
                );
                console.log(res.data.length);
                if (res.data.length !== 0) {
                    await axios.post("/conversations/makepair", {
                        pair: [
                            userData.replace(/['']+/g, ""),
                            res.data.key.replace(/['']+/g, ""),
                        ],
                    });
                    // res = res.filter((item) => item.key !== String(userData));}
                }
                setTimeout(() => {
                    fetchChatData(userData);
                }, 1000);
                console.log(res.data.key);
            });
        }
    };
    const generator = new AvatarGenerator();
    const avatarIcon = useMemo(() => generator.generateRandomAvatar(), []);
    return (
        <>
            <div className="sidebar">
                <div className="sidebar_header">
                    <Avatar className={classes.avatar} src={avatarIcon} />
                </div>
                {/* <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
      </div> */}
                <div onClick={addRandomUser} className="adduser-btn-container">
                    <ButtonLoader />
                </div>
                <div className="sidebar_chats">
                    <div data-triggered={false}>
                        <div className="sidebar_chats">
                            {contacts &&
                                contacts.map((contact) => {
                                    return (
                                        <div
                                            key={uuidV4()}
                                            onClick={() => {
                                                setSelectedContact(
                                                    contact[0][0]
                                                );
                                                setSelectedContactA(
                                                    contact[1][0]
                                                );
                                            }}
                                        >
                                            <SidebarChat
                                                contact={contact}
                                                selectedContact={
                                                    selectedContact
                                                }
                                            />
                                        </div>
                                    );
                                })}

                            {/* <SidebarChat/>
               <SidebarChat/>
               <SidebarChat/>   */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        chatData: state.chatData,
        userAvatarName: state.userAvatarName,
    };
};

export default connect(mapStateToProps, { fetchChatData })(Sidebar);
