import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";

import "./FollowersCard.css";
import { getAllUser } from "../../api/userRequests";
import User from "../user/User";

const FollowersCard = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();

      setPersons(data);
    };

    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>

      {persons.map((person) => (
        <Fragment key={person._id}>
          {person._id !== user._id && <User person={person} />}
        </Fragment>
      ))}
    </div>
  );
};

export default FollowersCard;
