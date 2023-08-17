import "./InfoBar.css";
import Empfang from "../../images/Empfang.png";
import Wifi from "../../images/Wifi.png";
import Accu from "../../images/Accu.png";

const InfoBar = () => {
  return (
    <>
      <div className="time">
        <h6>09:41</h6>
      </div>
      <div className="top-bar">
        <img src={Empfang} alt="empfang" className="reception" />
        <img src={Wifi} alt="wlan" className="wlan" />
        <img src={Accu} alt="akku" className="accu" />
      </div>
    </>
  );
};

export default InfoBar;
