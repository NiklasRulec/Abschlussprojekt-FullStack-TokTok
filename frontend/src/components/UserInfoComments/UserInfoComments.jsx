import "./UserInfoComments.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import MoreMenu from "../../images/MoreMenu.svg";
import { RefreshContext } from "../../user/RefreshContext";
import { Link } from "react-router-dom";
import Avatar from "../../images/Avatar.svg";
import moremenulight from "../../images/moremenu-light.svg";
import { ThemeContext } from "../../user/ThemeContext";

const UserInfoComments = (props) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { refresh, setRefresh } = useContext(RefreshContext);
  const [userData, setUserData] = useState();
  const userId = props.user;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/user/${userId}`);
      setUserData(data);
    };
    fetchData();
  }, [refresh]);

  return (
    <>
      {userData ? (
        <figure className="user-info-bar">
          <div className="user-info-left">
            <Link to={`/profile/${userId}`}>
              {userData[0].image ? (
                <img
                  className="profile-avatar"
                  src={userData[0].image.url}
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
              <h4>{userData[0].nickname}</h4>
              <p className="profession">{userData[0].profession}</p>
            </div>
          </div>
          {theme ? (
            <img className="more-menu" src={moremenulight} alt="MoreMenu" />
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

export default UserInfoComments;
