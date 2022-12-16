import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UilPen } from "@iconscout/react-unicons";

import "./InfoCard.css";
import * as UserApi from "../../api/userRequests.js";
import { logout } from "../../actions/authActions";
import ProfileModal from "../profileModal/ProfileModal";

const InfoCard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const params = useParams();

  const profileUserId = params.id;
  const me = user._id === profileUserId;

  const [modalOpened, setModalOpened] = useState(false);
  const [profileUser, setProfileUser] = useState({});

  const onShowModal = () => setModalOpened(true);
  const onCloseModal = () => setModalOpened(false);

  const handleLogOut = () => dispatch(logout());

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (me) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>

        {me && (
          <div>
            <UilPen width="2rem" height="1.2rem" onClick={onShowModal} />
            <ProfileModal
              modalOpened={modalOpened}
              onCloseModal={onCloseModal}
            />
          </div>
        )}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
          {profileUser.relationship}
        </span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
          {profileUser.livesin}
        </span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
          {profileUser.worksAt}
        </span>
      </div>

      {me && (
        <button className="button logout-button" onClick={handleLogOut}>
          Logout
        </button>
      )}
    </div>
  );
};

export default InfoCard;
