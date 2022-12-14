import React from "react";

import "./FollowersCard.css";
import { followers } from "../../data/followersData";

const FollowersCard = () => {
  return (
    <div className="FollowersCard">
      <h3>Who is following you</h3>

      {followers.map((follower) => (
        <div key={follower.id} className="follower">
          <div>
            <img
              className="followerImage"
              src={follower.img}
              alt="follower's profile"
            />

            <div className="name">
              <span>{follower.name}</span>
              <span>@{follower.username}</span>
            </div>
          </div>

          <button className="button fc-button">Follow</button>
        </div>
      ))}
    </div>
  );
};

export default FollowersCard;
