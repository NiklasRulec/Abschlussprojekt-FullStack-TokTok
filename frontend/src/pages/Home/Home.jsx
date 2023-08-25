import InfoBar from "../../components/InfoBar/InfoBar";
import heart from "../../images/HeartInactive.svg";
import heartlight from "../../images/heart-light.svg";
import HomeUserList from "../../components/HomeUserList/HomeUserList";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Logo from "../../images/Logo.svg";
import { ThemeContext } from "../../user/ThemeContext";
import { useContext } from "react";
import light from "../../images/light.svg";
import dark from "../../images/dark.svg";

const Home = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const themeToggle = () => {
    setTheme((prev) => !prev);
  };
  return (
    <>
      <div
        className={theme ? "nav-fixed-wrapper-dark" : "nav-fixed-wrapper-light"}
      >
        {/* <InfoBar /> */}
        <div className="home-section-top">
          <div className="home-section-top-left">
            <img src={Logo} alt="logo" className="toktok-logo" />
            <h1>TokTok</h1>
          </div>

          {theme ? (
            <img
              src={light}
              alt="light-icon"
              onClick={themeToggle}
              className="theme-btn"
            />
          ) : (
            <img
              src={dark}
              alt="dark-icon"
              onClick={themeToggle}
              className="theme-btn"
            />
          )}
          {theme ? (
            <img src={heartlight} alt="heart-icon" className="heart-icon" />
          ) : (
            <img src={heart} alt="heart-icon" className="heart-icon" />
          )}
        </div>
      </div>
      <HomeUserList />
      <Navbar />
    </>
  );
};

export default Home;
