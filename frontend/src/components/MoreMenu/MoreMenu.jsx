import "./MoreMenu.css";
import Vector from "../../images/Vector.svg";
import Settings from "../../images/Settings.svg";
import ArrowDown from "../../images/ArrowDown.svg";
import Time from "../../images/Time.svg";
import Scan from "../../images/Scan.svg";
import Bookmark from "../../images/Bookmark.svg";
import Friends from "../../images/Friends.svg";
import HeartInactive from "../../images/HeartInactive.svg";
import Info from "../../images/Info.svg";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../user/UserContext";
import { ThemeContext } from "../../user/ThemeContext";
import settingslight from "../../images/settings-light.svg";
import archivelight from "../../images/archive-light.svg";
import activitylight from "../../images/activity-light.svg";
import qrlight from "../../images/qr-light.svg";
import savedlight from "../../images/saved-light.svg";
import friendslight from "../../images/friends-light.svg";
import favoriteslight from "../../images/favorites-light.svg";
import infolight from "../../images/info-light.svg";

const MoreMenu = ({ onClose }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [slideOut, setSlideOut] = useState(false);
  const { logout, isLoggedIn } = useContext(UserContext)

  useEffect(() => {
    if (slideOut) {
      const animationTimeout = setTimeout(() => {
        onClose();
      }, 350);
      return () => clearTimeout(animationTimeout);
    }
  }, [slideOut, onClose]);

  const handleStrokeClick = () => {
    setSlideOut(true);
  };

  const userLogout = () => {
    logout();
  };

  return (
    <section
      className={
        theme
          ? `more-menu-menu-dark ${slideOut ? "slide-out-menu" : ""}`
          : `more-menu-menu-light ${slideOut ? "slide-out-menu" : ""}`
      }
    >
      <img
        src={Vector}
        alt="vector"
        className="stroke"
        onClick={handleStrokeClick}
      />
      <div className="set">
        {theme ? (
          <img className="more-menu-icon" src={settingslight} alt="setting" />
        ) : (
          <img className="more-menu-icon" src={Settings} alt="setting" />
        )}

        <h5 className="semibold-18">Settings</h5>
      </div>
      <div className="archive">
        {theme ? (
          <img className="more-menu-icon" src={archivelight} alt="down" />
        ) : (
          <img className="more-menu-icon" src={ArrowDown} alt="down" />
        )}

        <h5 className="semibold-18">Archive</h5>
      </div>
      <div className="activity">
        {theme ? (
          <img className="more-menu-icon" src={activitylight} alt="time" />
        ) : (
          <img className="more-menu-icon" src={Time} alt="time" />
        )}

        <h5 className="semibold-18">Your Activity</h5>
      </div>
      <div className="code-scan">
        {theme ? (
          <img className="more-menu-icon" src={qrlight} alt="qr" />
        ) : (
          <img className="more-menu-icon" src={Scan} alt="qr" />
        )}

        <h5 className="semibold-18">QR Code</h5>
      </div>
      <div className="mark">
        {theme ? (
          <img className="more-menu-icon" src={savedlight} alt="save" />
        ) : (
          <img className="more-menu-icon" src={Bookmark} alt="save" />
        )}

        <h5 className="semibold-18">Saved</h5>
      </div>
      <div className="closing">
        {theme ? (
          <img className="more-menu-icon" src={friendslight} alt="close" />
        ) : (
          <img className="more-menu-icon" src={Friends} alt="close" />
        )}

        <h5 className="semibold-18">Close Friends</h5>
      </div>
      <div className="heart">
        {theme ? (
          <img className="more-menu-icon" src={favoriteslight} alt="favorite" />
        ) : (
          <img className="more-menu-icon" src={HeartInactive} alt="favorite" />
        )}

        <h5 className="semibold-18">Favorites</h5>
      </div>
      <div className="info">
        {theme ? (
          <img className="more-menu-icon" src={infolight} alt="information" />
        ) : (
          <img className="more-menu-icon" src={Info} alt="information" />
        )}

        <h5 className="semibold-18">Information Center</h5>
      </div>
      <p className="semibold-18 logout-btn" onClick={userLogout}>
        Logout
      </p>
    </section>
  );
};

export default MoreMenu;
