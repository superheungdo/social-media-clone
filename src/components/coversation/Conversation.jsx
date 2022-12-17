import React, { useEffect, useState } from "react";
import { getUser } from "../../api/userRequests";

const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot" />}

          <img
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
            src={
              userData?.profilePicture
                ? process.env.REACT_APP_SERVER_PUBLIC_URL +
                  userData.profilePicture
                : process.env.REACT_APP_SERVER_PUBLIC_URL + "defaultProfile.png"
            }
            alt="profile"
          />

          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span style={{ textTransform: "capitalize" }}>
              {userData?.firstname} {userData?.lastname}
            </span>

            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
