import React from "react";

import "./ProfileSide.css";
import LogoSearch from "../logoSearch/LogoSearch";
import ProfileCard from "../profileCard/ProfileCard";
import FollowersCard from "../followersCard/FollowersCard";

const ProfileSide = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard location="home" />
      <FollowersCard />
    </div>
  );
};

export default ProfileSide;
