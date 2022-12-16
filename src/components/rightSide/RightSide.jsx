import React, { useState } from "react";

import "./RightSide.css";
import NavIcons from "../navIcons/NavIcons";
import TrendCard from "../trendCard/TrendCard";
import ShareModal from "../shareModal/ShareModal";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const onShowModal = () => setModalOpened(true);
  const onCloseModal = () => setModalOpened(false);

  return (
    <div className="RightSide">
      <NavIcons />

      <TrendCard />

      <button className="button r-button" onClick={onShowModal}>
        Share
      </button>

      <ShareModal modalOpened={modalOpened} onCloseModal={onCloseModal} />
    </div>
  );
};

export default RightSide;
