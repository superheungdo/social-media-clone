import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./ProfileCard.css";

const serverPublic = process.env.REACT_APP_SERVER_PUBLIC_URL;

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCover.png"
          }
          alt="cover"
        />

        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="profile"
        />
      </div>

      <div className="ProfileName">
        <span style={{ textTransform: "capitalize" }}>
          {user.firstname} {user.lastname}
        </span>

        <span>{user.worksAt ?? "Write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />

        <div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>

          <div className="vl" />

          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>

          {location === "profile" && (
            <>
              <div className="vl" />
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>

        <hr />
      </div>

      {location === "profile" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
