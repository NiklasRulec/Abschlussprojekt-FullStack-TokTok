import "./InfoBar.css";
import Empfang from "../../images/Empfang.png";
import Wifi from "../../images/Wifi.png";
import Accu from "../../images/Accu.png";
import { useEffect, useState } from "react";

const InfoBar = () => {
  const [time, setTime] = useState();

  useEffect(() => {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    setTime(`${hours}:${minutes}`);
  }, []);

  return (
    <>
      <div className="time">
        <h6>{time}</h6>
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
