import "./LoadingScreen.css";
import Landing from "../../images/Landing.svg";
import LoadingAnimation from "../../images/LoadingAnimation.svg";

const LoadingScreen = () => {
  return (
    <>
      <img src={Landing} className="landing" />
      <img src={LoadingAnimation} className="loading" />
    </>
  );
};

export default LoadingScreen;