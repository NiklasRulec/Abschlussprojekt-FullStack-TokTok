import './Navbar.css'
import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import HomeActive from "../../images/HomeActive.svg"
import HomeInactive from "../../images/HomeInactive.svg"
import SearchActive from "../../images/SearchActive.svg"
import SearchInactive from "../../images/SearchInactive.svg"
import UploadActive from "../../images/UploadActive.svg"
import UploadInactive from "../../images/UploadInactive.svg"
import ProfileActive from "../../images/ProfileActive.svg"
import ProfileInactive from "../../images/ProfileInactive.svg"

const Navbar = () => {
  const [active, setActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/home") {
      setActive("home");
    } else if (path === "/search") {
      setActive("search");
    } else if (path === "/upload") {
      setActive("upload");
    } else if (path === "/profile") {
      setActive("profile");
    }
  }, [location]);

  return (
    <section className="navBar">
      <nav>
        <article className="navHome">
          <NavLink to="/home">
            <img src={active === "home" ? HomeActive : HomeInactive} alt="" />
          </NavLink>
        </article>
        <article className="navSearch">
          <NavLink to="/search">
            <img
              src={active === "search" ? SearchActive : SearchInactive}
              alt=""
            />
          </NavLink>
        </article>
        <article className="navUpload">
          <NavLink to="/upload">
            <img
              src={active === "upload" ? UploadActive : UploadInactive}
              alt=""
            />
          </NavLink>
        </article>
        <article className="navProfile">
          <NavLink to="/profile">
            <img
              src={active === "profile" ? ProfileActive : ProfileInactive}
              alt=""
            />
          </NavLink>
        </article>
      </nav>
    </section>
  );
};

export default Navbar;
