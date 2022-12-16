import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal, useMantineTheme } from "@mantine/core";

import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";

function ProfileModal({
  modalOpened,
  onCloseModal,
  data: { password, ...other },
}) {
  const param = useParams();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(other);
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const theme = useMantineTheme();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];

      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = formData;

    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + "-" + profileImage.name;

      data.append("name", fileName);
      data.append("file", profileImage);

      userData.profilePicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }

    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + "-" + coverImage.name;

      data.append("name", fileName);
      data.append("file", coverImage);

      userData.coverPicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }

    dispatch(updateUser(param.id, userData));
    onCloseModal();
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={onCloseModal}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            value={formData.worksAt}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="Lives in"
            value={formData.livesIn}
            onChange={handleChange}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="RelationShip Status"
            value={formData.relationship}
            onChange={handleChange}
          />
        </div>

        <div>
          Profile Image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover Image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
