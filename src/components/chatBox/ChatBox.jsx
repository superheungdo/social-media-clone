import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import InputEmoji from "react-input-emoji";

import "./ChatBox.css";
import { getUser } from "../../api/userRequests";
import { addMessage, getMessages } from "../../api/messageRequests";

const ChatBox = ({ chat, currentUser, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scrollRef = useRef();
  const imageRef = useRef();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();

    const message = {
      chatId: chat._id,
      senderId: currentUser,
      text: newMessage,
    };

    // send message to database
    try {
      const { data } = await addMessage(message);

      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  return (
    <div className="ChatBox-container">
      {chat ? (
        <>
          {/* Chat Header */}
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                  src={
                    userData?.profilePicture
                      ? process.env.REACT_APP_SERVER_PUBLIC_URL +
                        userData.profilePicture
                      : process.env.REACT_APP_SERVER_PUBLIC_URL +
                        "defaultProfile.png"
                  }
                  alt="profile"
                />

                <div className="name" style={{ fontSize: "0.9rem" }}>
                  <span style={{ textTransform: "capitalize" }}>
                    {userData?.firstname} {userData?.lastname}
                  </span>
                </div>
              </div>
            </div>

            <hr
              style={{
                width: "95%",
                border: "0.1px solid #ececec",
                marginTop: "20px",
              }}
            />
          </div>

          {/* Chat Body */}
          <div className="chat-body">
            {messages.map((message) => (
              <div
                ref={scrollRef}
                className={
                  message.senderId === currentUser ? "message own" : "message"
                }
              >
                <span>{message.text}</span>
                <span>{moment(message.createdAt).fromNow()}</span>
              </div>
            ))}
          </div>

          {/* Chat Sender */}
          <div className="chat-sender">
            <div onClick={() => imageRef.current.click()}>+</div>

            <InputEmoji value={newMessage} onChange={handleChange} />

            <div className="send-button button" onClick={handleSend}>
              Send
            </div>

            <input
              ref={imageRef}
              type="file"
              name=""
              id=""
              style={{ display: "none" }}
            />
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )}
    </div>
  );
};

export default ChatBox;
