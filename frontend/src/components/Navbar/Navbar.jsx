import './Navbar.css'

import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"

import HomeActive from "../../images/HomeActive.png"
import HomeInactive from "../../images/HomeInactive.png"
import SearchActive from "../../images/SearchActive.png"
import SearchInactive from "../../images/SearchInactive.png"
import UploadActive from "../../images/UploadActive.png"
import UploadInactive from "../../images/UploadInactive.png"
import ProfileActive from "../../images/ProfileActive.png"
import ProfileInactive from "../../images/ProfileInactive.png"


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
        <section className='navBar'>
            <nav>
                <article className="navHome">
                    <NavLink to="/home">
                        <img src={active === "home" ? HomeActive : HomeInactive} alt="" />
                    </NavLink>
                </article>
                <article className="navSearch">
                    <NavLink to="/search">
                        <img src={active === "search" ? SearchActive : SearchInactive} alt="" />
                    </NavLink>
                </article>
                <article className="navUpload">
                    <NavLink to="/upload">
                        <img src={active === "upload" ? UploadActive : UploadInactive} alt="" />
                    </NavLink>
                </article>
                <article className="navProfile">
                    <NavLink to="/profile">
                        <img src={active === "profile" ? ProfileActive : ProfileInactive} alt="" />
                    </NavLink>
                </article>
            </nav>            
        </section>

    );
}

export default Navbar;