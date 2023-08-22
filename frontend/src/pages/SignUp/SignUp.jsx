import "./SignUp.css";
import InfoBar from "../../components/InfoBar/InfoBar";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RefreshContext } from "../../user/RefreshContext";
import Logo from "../../images/Logo.svg";
import Hide from "../../images/Hide.svg";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function SignUp() {
  const { refresh, setRefresh } = useContext(RefreshContext);
  const [error, setError] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const nav = useNavigate();
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let waitForNavigation;

  const goToEditProfile = () => {
    nav("/profile/edit");
    clearTimeout(waitForNavigation)
  }

  useEffect(() => {
    const loggingIn = async () => {
      if (success === true){
        // logging in automatically after signup was successful
        const loginInput = {
          email: email,
          password: password,
        };
        try {
          const { data } = await axios.post("/api/user/login", loginInput);
          if (data) {
            setRefresh((prev) => !prev);
            waitForNavigation = setTimeout(goToEditProfile, 3000);
          }
        } catch (e) {
          console.log(e);
          setError("An Error occured, try again later");
        }
      } else {
        return
      }
    }
    loggingIn()
  },[success])

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    try {
      await axios.post("/api/user/signup", data);
      setSuccess(true)
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
        <h1>
          Create your Account
        </h1>
      </div>
      <img src={Logo} className="logo" />

    <form onSubmit={submit}>
      <input name="email" type="text" placeholder="Email" id="email" onChange={(e) => setEmail(e.target.value)}/>
      <input name="password" type="password" placeholder="Password" id="password" onChange={(e) => setPassword(e.target.value)}/>
      <div className="hide">
          <img src={Hide} />
        </div>
      {error && <small style={{ color: "red" }}>{error}</small>}

      <button type="submit" className="sign-btn">Sign up</button>
    </form>
    {success && <p className="sign-up-info-text">Sign up was successful. Logging in and forwarding to edit your Profile..</p>}
    
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