import "./InfoBar.css";
import { useEffect, useState } from "react";
import Empfang from "../../images/Empfang.svg";
import Wifi from "../../images/Wifi.svg";
import Accu from "../../images/Accu.svg";

const InfoBar = () => {
  const [time, setTime] = useState();

  useEffect(() => {
    let now = new Date();
    let hours = now.getHours();
    let hours2 = hours < 10 ? "0" : "";
    let minutes = now.getMinutes();
    let minutes2 = minutes < 10 ? ":0" : ":";
    setTime(`${hours2}${hours}${minutes2}${minutes}`);
  }, []);

  return (
    <>
      <div className="info-bar">
        <p className="semibold-16">{time}</p>
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
