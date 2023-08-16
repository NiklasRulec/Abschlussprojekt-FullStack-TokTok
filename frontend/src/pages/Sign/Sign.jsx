import "./Sign.css";
import InfoBar from "../../components/InfoBar/InfoBar";
import Logo from "../../images/Logo.png";
import SignBtn from "../../components/SignBtn/SignBtn";
import { Link } from "react-router-dom";

const Sign = () => {
  return (
    <>
      <InfoBar />
      <div className="headline">
        <h1>
          Create your <br></br>Account
        </h1>
      </div>
      <img src={Logo} className="logo" />
      <form>
        <input type="text" id="email" placeholder="Email"></input>
        <br></br>
        <input type="text" id="password" placeholder="Password"></input>
      </form>
      <SignBtn />
      <div className="sign-in-user">
        <p>Already have an account?</p>
        <Link to="/signin" className="sign-in">
          Sign in
        </Link>
      </div>
    </>
  );
};

export default Sign;
