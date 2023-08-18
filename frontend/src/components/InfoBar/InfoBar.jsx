import "./InfoBar.css";
import Empfang from "../../images/Empfang.svg";
import Wifi from "../../images/Wifi.svg";
import Accu from "../../images/Accu.svg";

const InfoBar = () => {
  return (
    <>
      <div className="info-bar">
        <p className="semibold-16">09:41</p>
      <div className="info-bar-left">
        <img src={Empfang} alt="empfang" className="reception" />
        <img src={Wifi} alt="wlan" className="wlan" />
        <img src={Accu} alt="akku" className="accu" />
      </div>
      </div>
    </>
  );
};

export default InfoBar;
