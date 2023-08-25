import "./UserInfoBar.css";
import { useContext, useState } from "react";
import MoreMenu from "../../images/MoreMenu.svg";
import { Link } from "react-router-dom";
import Avatar from "../../images/Avatar.svg";
import { ThemeContext } from "../../user/ThemeContext";
import moremenudark from "../../images/moremenu-light.svg";

const UserInfoBar = (props) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [userData, setUserData] = useState(props.post.user);

  return (
    <>
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
          {theme ? (
            <img className="more-menu" src={moremenudark} alt="MoreMenu" />
          ) : (
            <img className="more-menu" src={MoreMenu} alt="MoreMenu" />
          )}
        </figure>
      ) : (
        <p>Lädt..</p>
      )}
    </>
  );
};

export default UserInfoBar;
