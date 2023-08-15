import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { RefreshContext } from "../user/RefreshContext";

export default function Login() {
  const { refresh, setRefresh } = useContext(RefreshContext);
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);
    try {
      await axios.post("/api/user/login", data);
      setRefresh((prev) => !prev);
    } catch (e) {
      console.log(e);
      setError("An Error occured, try again later");
    }
  };

  return (
    <form onSubmit={submit}>
      <input name="email" type="email" placeholder="your email" />
      <input name="password" type="password" placeholder="***********" />
      {error && <small style={{ color: "red" }}>{error}</small>}
      <button>Login</button>
    </form>
  );
}
