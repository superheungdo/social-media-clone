import "./Home.css";
import ProfileSide from "../../components/profileSide/ProfileSide";

const Home = () => {
  return (
    <div className="Home">
      <ProfileSide />
      <div className="postSide">PostSide</div>
      <div className="rightSide">RightSide</div>
    </div>
  );
};

export default Home;
