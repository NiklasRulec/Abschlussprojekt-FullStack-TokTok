import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RefreshContext } from "./user/RefreshContext";
import { ThemeContext } from "./user/ThemeContext";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile";
import ResetPassword from "./user/ResetPassword";
import Profile from "./pages/Profile/Profile";
import "./App.css";
import { useState } from "react";
import { UserProvider } from "./user/UserContext";
import Comments from "./pages/Comments/Comments";
import Search from "./pages/Search/Search";
import Upload from "./pages/Upload/Upload";
import EditProfile from "./pages/EditProfile/EditProfile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import LoadingScreen from "./pages/LoadingScreen/LoadingScreen";

function App() {
  const [refresh, setRefresh] = useState(true);
  const [theme, setTheme] = useState(false);

  return (
    <>
      <div className="mobile-only">
        <h2>Mobile Only</h2>
      </div>
      <div className={theme ? "dark" : "light"}>
        <div className="wrapper">
          <BrowserRouter>
            <ThemeContext.Provider value={{ theme, setTheme }}>
              <RefreshContext.Provider value={{ refresh, setRefresh }}>
                <UserProvider>
                  <Routes>
                    <Route path="/" element={<LoadingScreen />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/:id" element={<Comments />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/profile/edit" element={<EditProfile />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/passwordReset" element={<ResetPassword />} />
                  </Routes>
                </UserProvider>
              </RefreshContext.Provider>
            </ThemeContext.Provider>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
