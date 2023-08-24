import "./BackBtn.css";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../images/ArrowLeft.svg";
import backarrowlight from "../../images/arrow-back-light.svg";
import { useContext } from "react";
import { ThemeContext } from "../../user/ThemeContext";

const BackBtn = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <button className="backBtn" onClick={goBack}>
      {theme ? (
        <img src={backarrowlight} alt="back" />
      ) : (
        <img src={BackArrow} alt="back" />
      )}
    </button>
  );
};

export default BackBtn;
