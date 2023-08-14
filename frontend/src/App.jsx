import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RefreshContext } from "./user/RefreshContext";
import Home from "./pages/Home";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Profile from "./pages/Profile";
import ResetPassword from "./user/ResetPassword";
import "./App.css";
import { useState } from "react";
import { UserProvider } from "./user/UserContext";


function App() {
  const [refresh, setRefresh] = useState(true)

  return (
    <>
    <BrowserRouter>
    <RefreshContext.Provider value={{refresh, setRefresh}}>
    <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/passwordReset" element={<ResetPassword />} />
        </Routes>
        </UserProvider>
    </RefreshContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
