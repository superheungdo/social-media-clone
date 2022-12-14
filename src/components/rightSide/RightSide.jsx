import React, { useState } from "react";
import { UilSetting } from "@iconscout/react-unicons";

import "./RightSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import TrendCard from "../trendCard/TrendCard";
import ShareModal from "../shareModal/ShareModal";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const onShowModal = () => setModalOpened(true);
  const onCloseModal = () => setModalOpened(false);

  return (
    <div className="RightSide">
      <div className="navIcons">
        <img src={Home} alt="" />
        <UilSetting />
        <img src={Noti} alt="" />
        <img src={Comment} alt="" />
      </div>

      <TrendCard />

      <button className="button r-button" onClick={onShowModal}>
        Share
      </button>

      <ShareModal modalOpened={modalOpened} onCloseModal={onCloseModal} />
    </div>
  );
};

export default RightSide;
