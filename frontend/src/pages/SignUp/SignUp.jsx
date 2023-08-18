import InfoBar from "../../components/InfoBar/InfoBar";
import "./SignUp.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../images/Logo.svg";
import Hide from "../../images/Hide.svg";

export default function SignUp() {
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);

    try {
      await axios.post("/api/user/signup", data);
      nav("/login");
    } catch (e) {
      if (e?.response?.data?.error?.message) {
        setError(e?.response?.data?.error?.message);
      } else {
        setError("An Error occured, try again later");
      }
    }
  };

  return (
    <>
    {/* <LoadingScreen /> */}
    <InfoBar />
    <div className="headline">
        <h1>
          Create your Account
        </h1>
      </div>
      <img src={Logo} className="logo" />

    <form onSubmit={submit}>
      <input name="email" type="text" placeholder="Email" id="email"/>
      <input name="password" type="password" placeholder="Password" id="password"/>
      <div className="hide">
          <img src={Hide} />
        </div>
      {error && <small style={{ color: "red" }}>{error}</small>}
      <button type="submit" className="sign-btn">Sign up</button>
    </form>
    
    <div className="sign-in-user">
        <p>Already have an account?</p>
        <Link to="/login" className="sign-in">
          Sign in
        </Link>
      </div>
    </>
  );
}

