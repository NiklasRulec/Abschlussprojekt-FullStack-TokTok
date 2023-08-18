// import MoreMenu from "../../components/MoreMenu/MoreMenu";
import InfoBar from "../../components/InfoBar/InfoBar";
import HomeUserList from "../../components/HomeUserList/HomeUserList";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Logo from "../../images/Logo.png";
import heart from "../../images/HeartInactive.png";

const Home = () => {
  return (
    <>
      <InfoBar />
      {/* <MoreMenu /> */}
      <div className="home-section-top">
        <div className="home-section-top-left">
          <img src={Logo} alt="logo" className="toktok-logo" />
          <h1>TokTok</h1>
        </div>
        <img src={heart} alt="heart-icon" className="heart-icon" />
      </div>
      <HomeUserList />
      <Navbar />
    </>
  );
};

export default Home;
