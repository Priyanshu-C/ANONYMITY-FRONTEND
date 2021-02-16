import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useCallback, useMemo } from "react";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "../../axios";
import { v4 as uuidV4 } from "uuid";
import { useEffect } from "react";
import Pusher from "pusher-js";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { AvatarGenerator } from "random-avatar-generator";

//redux imports
import { connect } from "react-redux";

function Chat({ userData, chatData, selectedContact, selectedContactA }) {
    const [conversationId, setConversationId] = useState(null);
    const [messages, setMessages] = useState(null);
    const [input, setInput] = useState("");
    // console.log(chatData)
    useEffect(() => {
        if (chatData) {
            let filteredData = chatData.map((data) => {
                let contact = data.pair.filter(
                    (user) => user !== JSON.parse(userData)
                );

                return {
                    contact: contact[0],
                    conversationId: data._id,
                    messages: data.messages,
                };
            });
            setMessages(filteredData);
        }
    }, [chatData, userData]);

    //   useEffect(() => {
    //     if(chatData)
    //         setConversationId(chatData.conversationId)
    //   }, [chatData]);

    const setRef = useCallback((node) => {
        if (node) {
            node.scrollIntoView({ smooth: true });
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
        messages &&
            messages.map((message) => {
                if (message.contact === selectedContact) {
                    setConversationId(message.conversationId);
                }
            });
    }, [selectedContact, messages]);

    const sendMessage = async (e) => {
        e.preventDefault();

        var date = new Date();
        var time = date.toLocaleTimeString([], { timeStyle: "short" });
        await axios.post("/messages/new", {
            _id: conversationId,
            message: {
                senderId: JSON.parse(userData),
                Timestamp: time,
                message: input,
            },
            Timestamp: Math.floor(Date.now() / 1000),
        });
        setInput("");
    };

    useEffect(() => {
        var pusher = new Pusher("22eb68a8a51cd8776df3", {
            cluster: "ap2",
        });

        const channels =
            messages &&
            messages.map((message) => {
                let channel = pusher.subscribe(
                    `conversation_${message.conversationId}`
                );
                channel.bind("updated", function (newMessage) {
                    setMessages(
                        messages.map((message) => {
                            if (
                                message.conversationId !==
                                newMessage.Message._id
                            ) {
                                return message;
                            }

                            return {
                                ...message,
                                messages: [
                                    ...message.messages,
                                    newMessage.Message.message,
                                ],
                            };
                        })
                    );
                });
                return channel;
            });

        //cleanup function
        return () => {
            // eslint-disable-next-line
            channels &&
                channels.map((channel) => {
                    channel.unbind_all();
                    channel.unsubscribe();
                });
        };
        //messages
    }, [messages]);
    const generator = new AvatarGenerator();
    const avatarIcon = useMemo(() => generator.generateRandomAvatar(), []);
    return (
        <div className="chat">
            <div className="chat_header">
                <div>
                    {selectedContact ? (
                        <Avatar
                            style={{ width: "55px", height: "55px" }}
                            src={avatarIcon}
                        />
                    ) : null}
                </div>

                <div className="chat_headerInfo">
                    <h3>{selectedContactA}</h3>
                    {/* <p>Last seen at...</p> */}
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <MoreVertIcon
                            style={{ color: " rgba(175, 172, 172, 0.788)" }}
                        />
                    </IconButton>
                </div>
            </div>
            <div
                style={{
                    height: "10px",
                    background: "none",
                    borderBottom: "1px solid rgba(199, 197, 197, 0.411)",
                    width: "90%",
                    alignSelf: "center",
                    color: "black",
                }}
            />
            <div className="chat_body">
                {
                    // eslint-disable-next-line
                    messages &&
                        messages.map((messageData) => {
                            if (messageData.contact === selectedContact) {
                                return messageData.messages.map(
                                    (message, index) => {
                                        const lastMessage =
                                            messageData.messages.length - 1 ===
                                            index;
                                        let own = false;
                                        if (
                                            message.senderId ===
                                            JSON.parse(userData)
                                        ) {
                                            own = true;
                                        }

                                        return (
                                            <p
                                                key={uuidV4()}
                                                ref={
                                                    lastMessage ? setRef : null
                                                }
                                                className={`chat_message ${
                                                    own && "chat_reciever"
                                                }`}
                                            >
                                                {message.message}
                                                <span className="chat_timestamp">
                                                    {message.Timestamp}
                                                </span>
                                            </p>
                                        );
                                    }
                                );
                            }
                        })
                }
            </div>
            {selectedContact ? (
                <div className="chat_footer">
                    <InsertEmoticonIcon />
                    <form>
                        <input
                            value={input}
                            placeholder="Type a message..."
                            type="text"
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" onClick={sendMessage}>
                            Send a message
                        </button>
                    </form>
                    <IconButton className="rotated-icon">
                        <AttachFileIcon className="attach-file-icons" />
                    </IconButton>
                    <div className="btn">
                        <span className="send-icon">
                            <SendRoundedIcon style={{ fontSize: "2rem" }} />
                        </span>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

const mapStateToProps = (state) => {
    return { userData: state.userData, chatData: state.chatData };
};
export default connect(mapStateToProps)(Chat);
