// import SearchItem from "../../components/SearchItem/SearchItem";
// import SearchList from "../../components/SearchList/SearchList";
import InfoBar from "../../components/InfoBar/InfoBar";
import Logo from "../../images/Logo.png";
import SignBtn from "../../components/SignBtn/SignBtn";
import { Link } from "react-router-dom";
import Hide from "../../images/Hide.png";
import Login from "../../user/Login";
import Signup from "../../user/Signup";
import UserProfile from "../UserProfile/UserProfile";
import "./Sign.css";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const isProd = process.env.NODE_ENV === "production";

const Sign = () => {
  // const [error, setError] = useState(null);
  // const nav = useNavigate();

  // const submit = async (e) => {
  //   e.preventDefault();
  //   setError(null);

  //   const data = new FormData(e.currentTarget);
  //   try {
  //     await axios.post("/api/user/signup", data);

  //     if (isProd) {
  //       nav("/login");
  //     }
  //   } catch (e) {
  //     if (e?.response?.data?.error?.message) {
  //       setError(e?.response?.data?.error?.message);
  //     } else {
  //       setError("An Error occured, try again later");
  //     }
  //   }
  // };

  return (
    <>
      <InfoBar />

      {/* <div className="headline">
        <h1>
          Create your <br></br>Account
        </h1>
      </div>
      <img src={Logo} className="logo" /> */}

      {/* <form onSubmit={submit}>
        <input name="name" type="text" placeholder="Your name" />
        <input type="email" id="email" placeholder="Email"></input>
        <br></br>
        <input type="password" id="password" placeholder="Password"></input>
        <div className="hide">
          <img src={Hide} />
        </div>
        {error && <small style={{ color: "red" }}>{error}</small>}
        <button type="submit">Signup</button>
      </form> */}

      <SignBtn />

      {/* <div className="sign-in-user">
        <p>Already have an account?</p>
        <Link to="/signin" className="sign-in">
          Sign in
        </Link>
      </div> */}

      {/* <LoadingScreen /> */}
      <Signup />
      <Login />
      {/* <UserProfile /> */}
    </>
  );
};

export default Sign;
