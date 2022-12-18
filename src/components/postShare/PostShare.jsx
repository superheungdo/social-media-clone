import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";

import "./PostShare.css";
import { uploadImage, uploadPost } from "../../actions/uploadAction";

const serverPublic = process.env.REACT_APP_SERVER_PUBLIC_URL;

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);

  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const descRef = useRef();

  const resetImage = () => setImage(null);

  const resetPost = () => {
    resetImage();
    descRef.current.value = "";
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];

      img.src = URL.createObjectURL(img);
      setImage(img);

      URL.revokeObjectURL(img);
    }
  };

  const handleUpload = async (e) => {
    try {
      e.preventDefault();

      // post data
      const newPost = {
        userId: user._id,
        desc: descRef.current.value,
      };

      // if there is an image with post
      if (image) {
        try {
          const data = new FormData();
          const fileName = Date.now() + "-" + image.name;
          data.append("name", fileName);
          data.append("file", image);
          newPost.image = fileName;

          dispatch(uploadImage(data));
        } catch (err) {
          console.log(err);
        }
      }

      dispatch(uploadPost(newPost));
      resetPost();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="profile"
      />

      <div>
        <input
          ref={descRef}
          type="text"
          required
          placeholder="What's happening"
        />

        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>

          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>

          <div className="option" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>

          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={resetImage} />
            <img src={image.src} alt="upload" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
