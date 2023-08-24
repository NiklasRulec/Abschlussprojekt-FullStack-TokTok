import "./CancelBtn.css";
import { useNavigate } from "react-router-dom";
import Cancel from "../../images/Cancel.svg";
import cancellight from "../../images/cancel-light.svg";
import { useContext } from "react";
import { ThemeContext } from "../../user/ThemeContext";

const CancelBtn = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const cancel = () => {
    navigate(-1);
  };

  return (
    <>
      <button className="cancelBtn" onClick={cancel}>
        {theme ? (
          <img src={cancellight} alt="back" />
        ) : (
          <img src={Cancel} alt="back" />
        )}
      </button>
    </>
  );
};

export default CancelBtn;
