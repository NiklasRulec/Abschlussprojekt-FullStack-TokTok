import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RefreshContext } from "../../user/RefreshContext";
import './Login.css'
import Logo from "../../images/Logo.svg";
import Hide from "../../images/Hide.svg";
import InfoBar from "../../components/InfoBar/InfoBar";
import { AmountOfFollowingContext } from '../../user/AmountOfFollowingContext'

export default function Login() {
  const { refresh, setRefresh } = useContext(RefreshContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { amountOfFollowing, setAmountOfFollowing } = useContext(AmountOfFollowingContext)

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    const loginInput = {
      email: email,
      password: password,
    };
    try {
      const { data } = await axios.post("/api/user/login", loginInput);
      if (data) {
        setRefresh((prev) => !prev);
        console.log(data.data.amountOfFollowing);
        setAmountOfFollowing(data.data.amountOfFollowing)
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
      setError("An Error occured, try again later");
    }
  };

  return (
    <>
    {/* <InfoBar /> */}
    <div className="headline">
        <h1>
          Login to your Account
        </h1>
      </div>
      <img src={Logo} className="logo" />


    <form onSubmit={submit}>
      <input name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} id="email"/>
      <input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} id="password"/>
      <div className="hide">
          <img src={Hide} />
        </div>
      <button type="submit" className="sign-btn">Login</button>
      {error && <small style={{ color: "red" }}>{error}</small>}
    </form>

    <div className="sign-in-user">
        <p className="login-signup-question">Don't have an account?</p>
        <Link to="/" className="sign-in">
          Sign up
        </Link>
      </div>
    </>
  );
}
