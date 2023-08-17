import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../images/Logo.png";
import Hide from "../images/Hide.png";

const isProd = process.env.NODE_ENV === "production";

export default function Signup() {
  const [error, setError] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      await axios.post("/api/user/signup", data);

      if (isProd) {
        nav("/login");
      }
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
    <div className="headline">
        <h1>
          Create your <br></br>Account
        </h1>
      </div>
      <img src={Logo} className="logo" />

    <form onSubmit={submit}>
      <input name="name" type="text" placeholder="Your name" />
      <input name="email" type="text" placeholder="your email" />
      <input name="password" type="password" placeholder="***********" />
      <div className="hide">
          <img src={Hide} />
        </div>
      {error && <small style={{ color: "red" }}>{error}</small>}
      <button>Signup</button>
    </form>

    <div className="sign-in-user">
        <p>Already have an account?</p>
        <Link to="/signin" className="sign-in">
          Sign in
        </Link>
      </div>
    </>
  );
}
