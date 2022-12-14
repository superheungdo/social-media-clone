import React from "react";

import "./Posts.css";
import { posts } from "../../data/postsData";
import Post from "../post/Post";

const Posts = () => {
  return (
    <div className="Posts">
      {posts.map((post) => {
        return <Post key={post.id} data={post} />;
      })}
    </div>
  );
};

export default Posts;
