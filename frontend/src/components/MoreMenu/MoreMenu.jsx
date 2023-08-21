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

const MoreMenu = ({ onClose }) => {
  const handleStrokeClick = () => {
    onClose();
  };
  return (
    <section className="more-menu-menu">
      <img
        src={Vector}
        alt="vector"
        className="stroke"
        onClick={handleStrokeClick}
      />
      <div className="set">
        <img src={Settings} alt="setting" />
        <h5 className="semibold-18">Settings</h5>
      </div>
      <div className="archive">
        <img src={ArrowDown} alt="down" />
        <h5 className="semibold-18">Archive</h5>
      </div>
      <div className="activity">
        <img src={Time} alt="time" />
        <h5 className="semibold-18">Your Activity</h5>
      </div>
      <div className="code-scan">
        <img src={Scan} alt="qr" />
        <h5 className="semibold-18">QR Code</h5>
      </div>
      <div className="mark">
        <img src={Bookmark} alt="save" />
        <h5 className="semibold-18">Saved</h5>
      </div>
      <div className="closing">
        <img src={Friends} alt="close" />
        <h5 className="semibold-18">Close Friends</h5>
      </div>
      <div className="heart">
        <img src={HeartInactive} alt="favorite" />
        <h5 className="semibold-18">Favorites</h5>
      </div>
      <div className="info">
        <img src={Info} alt="information" />
        <h5 className="semibold-18">Information Center</h5>
      </div>
    </section>
  );
};

export default MoreMenu;
