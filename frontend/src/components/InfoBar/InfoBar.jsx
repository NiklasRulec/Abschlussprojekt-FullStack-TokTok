import "./InfoBar.css";
import { useContext, useEffect, useState } from "react";
import Empfang from "../../images/Empfang.svg";
import Wifi from "../../images/Wifi.svg";
import Accu from "../../images/Accu.svg";
import { ThemeContext } from "../../user/ThemeContext";

const InfoBar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
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
      <div
        className={theme ? "info-bar-wrapper-dark" : "info-bar-wrapper-light"}
      >
        <div className="info-bar">
          <p className="semibold-16">{time}</p>
          <div className="info-bar-right">
            <img src={Empfang} alt="empfang" className="reception" />
            <img src={Wifi} alt="wlan" className="wlan" />
            <img src={Accu} alt="akku" className="accu" />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBar;
