import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { RefreshContext } from "./RefreshContext";
import { useNavigate } from "react-router";

// UserContext erstellen
export const UserContext = createContext();

// in UserProvider mehrere Funktionen schreiben, die wir später in den Context geben wollen
export const UserProvider = ({ children }) => {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const { refresh, setRefresh } = useContext(RefreshContext);

  // logout backend route aufrufen -> cookie wird im BA gelöscht
  const logout = async () => {
    await axios.get("/api/user/logout");
    setUser(null);
    nav("/");
  };

  // secure backend route aufrufen -> BA gibt user email zurück, wenn token authentifiziert ist
  useEffect(() => {
    axios
      .get("/api/user/secure")
      .then(({ data }) => setUser(data))
      .catch((e) => {
        setUser(null);
      });
  }, [refresh]);
  // immer wenn refresh geändert wird, wird diese Funktion neu abgespielt -> das heißt, es wird dann gecheckt ob die secure route die user email zurück gibt (authentifiziert), diese wird dann im user gespeichert und somit wäre isLoggedIn: true !! das heißt, beim login prozess reicht es, setRefresh(prev => !prev) zu machen !

  return (
    // an den context nun Funktionen anhängen aus dem UserProvider
    // logout Funktion + user durchgeben
    // UserProvider Komponente gibt den UserContext zurück
    // isLoggedIn: !!user --> gibt true oder false zurück -> wenn user data vorhanden ist, wird es true sein !
    <UserContext.Provider value={{ user, isLoggedIn: !!user, logout }}>
      {children}
    </UserContext.Provider>
  );
};
