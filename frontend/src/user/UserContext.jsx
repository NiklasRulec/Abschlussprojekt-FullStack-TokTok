import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { RefreshContext } from "./RefreshContext";
import { useNavigate } from "react-router";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const { refresh, setRefresh } = useContext(RefreshContext);

  const logout = async () => {
    await axios.get("/api/user/profile/logout");
    setUser(null);
    setRefresh(prev => !prev)
    nav("/");
  };

  useEffect(() => {
    axios.get("/api/user/secure")
    // secure route gibt email: req.userEmail zurück
      .then(({ data }) => setUser(data))
      .catch((e) => {
        setUser(null);
      });
  }, [refresh]);

  return (
    <UserContext.Provider value={{ user, isLoggedIn: !!user, logout }}>
      {children}
    </UserContext.Provider>
  );
};
