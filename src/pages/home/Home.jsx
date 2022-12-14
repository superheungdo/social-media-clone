import "./Home.css";
import ProfileSide from "../../components/profileSide/ProfileSide";
import PostSide from "../../components/postSide/PostSide";

const Home = () => {
  return (
    <div className="Home">
      <ProfileSide />
      <div className="postSide">
        <PostSide />
      </div>
      <div className="rightSide">RightSide</div>
    </div>
  );
};

export default Home;
