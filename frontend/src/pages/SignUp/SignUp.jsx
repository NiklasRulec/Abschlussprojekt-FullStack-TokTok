import InfoBar from "../../components/InfoBar/InfoBar";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import "./SignUp.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../images/Logo.svg";
import Hide from "../../images/Hide.svg";

export default function SignUp() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const nav = useNavigate();
  let waitForNavigation;

  const goToLogin = () => {
    nav("/login");
    clearTimeout(waitForNavigation);
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);

    try {
      await axios.post("/api/user/signup", data);
      setSuccess(true);
      waitForNavigation = setTimeout(goToLogin, 2000);
    } catch (e) {
      if (e?.response?.data?.error?.message) {
        setError(e?.response?.data?.error?.message);
      } else {
        setError("An Error occured, try again later");
      }
    }
  };

  useEffect(() => {
    const signUpTimer = setTimeout(() => {
      setShowSignUp(true);
      setShowLoading(false);
    }, 5000);

    return () => {
      clearTimeout(signUpTimer);
      setShowLoading(true);
    };
  }, []);

  return (
    <>
      {showLoading && <LoadingScreen />}
      <InfoBar />
      {showSignUp && (
        <>
        <div className="sign-up-page">
          <div className="headline">
            <h1>Create your Account</h1>
          </div>
          <img src={Logo} className="logo" />

          <form onSubmit={submit}>
            <input name="email" type="text" placeholder="Email" id="email" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              id="password"
            />
            <div className="hide">
              <img src={Hide} />
            </div>

            <button type="submit" className="sign-btn">
              Sign up
            </button>
            {error && <small style={{ color: "red" }}>{error}</small>}
          </form>
          {success && (
            <small>Sign up was successful. Forwarding to Login..</small>
          )}

          <div className="sign-in-user">
            <p>Already have an account?</p>
            <Link to="/login" className="sign-in">
              Sign in
            </Link>
          </div>

        </div>
        </>
      )}
    </>
  );
}
