import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Posts.css";
import Post from "../post/Post";
import { getTimelinePosts } from "../../actions/postAction";

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if (!posts) return "No posts :(";

  if (params.id) {
    const filteredPosts = posts.filter((post) => post.userId === params.id);

    return filteredPosts.map((post) => {
      return <Post key={post._id} data={post} />;
    });
  }

  return (
    <div className="Posts">
      {loading
        ? "Fetching posts...."
        : posts.map((post) => {
            return <Post key={post._id} data={post} />;
          })}
    </div>
  );
};

export default Posts;
