import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { RefreshContext } from "../user/RefreshContext";

export default function Login() {
  const { refresh, setRefresh } = useContext(RefreshContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        navigate("/profile");
      }
    } catch (e) {
      console.log(e);
      setError("An Error occured, try again later");
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        name="email"
        type="email"
        placeholder="your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="***"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <small style={{ color: "red" }}>{error}</small>}
      <button>Login</button>
    </form>
  );
}
