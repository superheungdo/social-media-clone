import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { userChats } from "../../api/chatRequests";

import "./Chat.css";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import NavIcons from "../../components/navIcons/NavIcons";
import Conversation from "../../components/coversation/Conversation";
import ChatBox from "../../components/chatBox/ChatBox";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);

    return online ? true : false;
  };

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };

    getChats();
  }, [user._id]);

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />

        <div className="Chat-container">
          <h2>Chats</h2>

          <div className="Chat-list">
            {chats.map((chat) => (
              <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>

        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
