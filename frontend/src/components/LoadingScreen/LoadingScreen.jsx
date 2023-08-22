import "./LoadingScreen.css";
import Landing from "../../images/Landing.svg";
import LoadingAnimation from "../../images/LoadingAnimation.svg";

const LoadingScreen = () => {
  return (
    <>
    <div className="loadingscreen-wrapper">
      <img src={Landing} className="landing" />
      <img src={LoadingAnimation} className="loading" />

    </div>
    </>
  );
};

export default LoadingScreen;