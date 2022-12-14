import React, { useState } from "react";
import { UilPen } from "@iconscout/react-unicons";

import "./InfoCard.css";
import ProfileModal from "../profileModal/ProfileModal";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const onShowModal = () => setModalOpened(true);
  const onCloseModal = () => setModalOpened(false);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>

        <div>
          <UilPen width="2rem" height="1.2rem" onClick={onShowModal} />
          <ProfileModal modalOpened={modalOpened} onCloseModal={onCloseModal} />
        </div>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
          in Relationship
        </span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
          Multan
        </span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
          Zainkeepscode inst
        </span>
      </div>

      <button className="button logout-button">Logout</button>
    </div>
  );
};

export default InfoCard;
