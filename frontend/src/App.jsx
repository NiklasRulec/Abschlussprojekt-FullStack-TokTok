import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RefreshContext } from "./user/RefreshContext";
import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile/UserProfile";
import Profile from "./pages/Profile/Profile";
import ResetPassword from "./user/ResetPassword";
import "./App.css";
import { useState } from "react";
import { UserProvider } from "./user/UserContext";
import Sign from "./pages/Sign/Sign";
import Comments from "./pages/Comments/Comments";
import Search from "./pages/Search/Search";
import Upload from "./pages/Upload/Upload";

function App() {
  const [refresh, setRefresh] = useState(true);

  return (
    <>
      <div className="wrapper">
        <BrowserRouter>
          <RefreshContext.Provider value={{ refresh, setRefresh }}>
            <UserProvider>
              <Routes>
                <Route path="/" element={<Sign />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home/:id" element={<Comments />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/passwordReset" element={<ResetPassword />} />
              </Routes>
            </UserProvider>
          </RefreshContext.Provider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
