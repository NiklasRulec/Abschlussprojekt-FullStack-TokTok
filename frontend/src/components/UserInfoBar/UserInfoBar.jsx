import "./UserInfoBar.css";
import { useContext, useEffect, useState } from "react";
import MoreMenu from "../../images/MoreMenu.svg";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../images/Avatar.svg";
import { ThemeContext } from "../../user/ThemeContext";
import moremenudark from "../../images/moremenu-light.svg";
import SmallMoreMenu from "../SmallMoreMenu/SmallMoreMenu";
import axios from "axios";

const UserInfoBar = (props) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [userData, setUserData] = useState(props.post.user);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const params = useParams();
  const [loggedUser, setLoggedUser] = useState();
  const [allowDelete, setAllowDelete] = useState(false);

  useEffect(() => {
    if (
      window.location.href.startsWith(
        "https://abschlussprojekt-toktok.onrender.com/home" ||
          "http://localhost:3000/home"
      )
    ) {
      // console.log("Richtiger Link");
      const fetchUser = async () => {
        const { data } = await axios.get(`/api/user/profile`);
        const post = await axios.get(`/api/post/${params.id}`);
        setLoggedUser(data);
        // console.log(data);
        // console.log(post.data.user._id);
        if (data._id == post.data.user._id) {
          setAllowDelete(true);
          // console.log("Ja gleicher User");
        } else {
          setAllowDelete(false);
          // console.log("Nein nicht gleicher User");
        }
      };
      fetchUser();
    } else {
      return;
      // console.log("Nicht der gleiche Link");
    }
  }, []);

  const toggleMoreMenu = () => {
    setShowMoreMenu(!showMoreMenu);
  };

  const closeMoreMenu = () => {
    setShowMoreMenu(false);
  };

  return (
    <>
      {showMoreMenu && <SmallMoreMenu onClose={closeMoreMenu} />}
      <div className={` ${showMoreMenu ? "gray-background" : ""}`}></div>
      {userData ? (
        <figure className="user-info-bar">
          <div className="user-info-left">
            <Link to={`/profile/${props.post.user._id}`}>
              {userData.image ? (
                <img
                  className="profile-avatar"
                  src={userData.image.url}
                  alt="profile-avatar"
                />
              ) : (
                <img
                  className="profile-avatar"
                  src={Avatar}
                  alt="profile-avatar"
                />
              )}
            </Link>
            <div className="user-info-text">
              <h4>{userData.nickname}</h4>
              <p className="profession">{userData.profession}</p>
            </div>
          </div>
          {allowDelete ? (
            theme ? (
              <img
                className="more-menu"
                src={moremenudark}
                alt="MoreMenu"
                onClick={toggleMoreMenu}
              />
            ) : (
              <img
                className="more-menu"
                src={MoreMenu}
                alt="MoreMenu"
                onClick={toggleMoreMenu}
              />
            )
          ) : (
            ""
          )}
        </figure>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default UserInfoBar;
