import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { followUser, unfollowUser } from "../../actions/userAction";

const serverPublic = process.env.REACT_APP_SERVER_PUBLIC_URL;

const User = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));

    setFollowing((prevState) => !prevState);
  };

  return (
    <div className="follower">
      <div>
        <img
          className="followerImage"
          src={
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="profile"
        />

        <div className="name">
          <span style={{ textTransform: "capitalize" }}>
            {person.firstname} {person.lastname}
          </span>
          <span>@{person.username}</span>
        </div>
      </div>

      <button
        className={`button fc-button ${following && "unfollow-button"}`}
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
