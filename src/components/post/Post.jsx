import React from "react";

import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";

const Post = ({ data }) => {
  const { img, name, desc, likes, liked } = data;

  return (
    <div className="Post">
      <img src={img} alt="post" />

      <div className="postReact">
        <img src={liked ? Heart : NotLike} alt="like" />
        <img src={Comment} alt="comment" />
        <img src={Share} alt="share" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
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
