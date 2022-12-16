import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Posts.css";
import Post from "../post/Post";
import { getTimelinePosts } from "../../actions/postAction";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

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
