import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import * as PostsApi from "../../api/postRequests";

const Post = ({ data: { _id, image, name, desc, likes: likesData } }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(likesData.includes(user._id));
  const [likes, setLikes] = useState(likesData.length);

  const handleLike = async () => {
    await PostsApi.likePost(_id, user._id);
    setLiked((prevState) => !prevState);
    setLikes((prevState) => (liked ? prevState - 1 : prevState + 1));
  };

  return (
    <div className="Post">
      <img
        src={image ? process.env.REACT_APP_SERVER_PUBLIC_URL + image : ""}
        alt="post"
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt="like"
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="comment" />
        <img src={Share} alt="share" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes === 1 ? `${likes} like` : `${likes} likes`}
      </span>

      <div className="detail">
        <span>
          <b>{name}</b>
        </span>
        <span> {desc}</span>
      </div>
    </div>
  );
};

export default Post;
