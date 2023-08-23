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
import {useState, useEffect, useContext} from "react"
import { UserContext } from '../../user/UserContext';

const MoreMenu = ({ onClose }) => {
  const [slideOut, setSlideOut] = useState(false);

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
  const { logout } = useContext(UserContext);

  const userLogout = () => {
    logout();
  };

  return (
    <section className={`more-menu-menu ${slideOut ? 'slide-out-menu' : ''}`}>
      <img src={Vector} alt="vector" className="stroke" onClick={handleStrokeClick} />
      <div className="set">
        <img className="more-menu-icon" src={Settings} alt="setting" />
        <h5 className="semibold-18">Settings</h5>
      </div>
      <div className="archive">
        <img className="more-menu-icon" src={ArrowDown} alt="down" />
        <h5 className="semibold-18">Archive</h5>
      </div>
      <div className="activity">
        <img className="more-menu-icon" src={Time} alt="time" />
        <h5 className="semibold-18">Your Activity</h5>
      </div>
      <div className="code-scan">
        <img className="more-menu-icon" src={Scan} alt="qr" />
        <h5 className="semibold-18">QR Code</h5>
      </div>
      <div className="mark">
        <img className="more-menu-icon" src={Bookmark} alt="save" />
        <h5 className="semibold-18">Saved</h5>
      </div>
      <div className="closing">
        <img className="more-menu-icon" src={Friends} alt="close" />
        <h5 className="semibold-18">Close Friends</h5>
      </div>
      <div className="heart">
        <img className="more-menu-icon" src={HeartInactive} alt="favorite" />
        <h5 className="semibold-18">Favorites</h5>
      </div>
      <div className="info">
        <img className="more-menu-icon" src={Info} alt="information" />
        <h5 className="semibold-18">Information Center</h5>
      </div>
      <p className="semibold-18 logout-btn" onClick={userLogout}>Logout</p>
    </section>
  );
};

export default MoreMenu;
