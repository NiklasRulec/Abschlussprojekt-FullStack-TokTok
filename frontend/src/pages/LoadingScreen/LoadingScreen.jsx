import "./LoadingScreen.css";
import Landing from "../../images/Landing.svg";
import LoadingAnimation from "../../images/LoadingAnimation.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InfoBar from "../../components/InfoBar/InfoBar";

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signup");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
    <InfoBar />
    <div className="loadingscreen-wrapper">
      <img src={Landing} className="landing" />
      <img src={LoadingAnimation} className="loading" />
    </div>
    </>
  );
};

export default LoadingScreen;