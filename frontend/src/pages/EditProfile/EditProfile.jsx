import "./EditProfile.css";
import InfoBar from "../../components/InfoBar/InfoBar";
import { Link } from "react-router-dom";
import EditProfileImage from "../../components/EditProfileImage/EditProfileImage";
import EditProfileInfo from "../../components/EditProfileInfo/EditProfileInfo";
import axios from "axios";
import arrowleft from "../../images/ArrowLeft.svg";
import arrowleftlight from "../../images/arrow-back-light.svg";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../user/ThemeContext";

const EditProfile = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [hasProfileInfo, setHasProfileInfo] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      if (data.nickname && data.name) {
        setHasProfileInfo(true);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <InfoBar />
      <section className="edit-profile-section">
        <div
          className={
            theme ? "nav-fixed-wrapper-dark" : "nav-fixed-wrapper-light"
          }
        >
          <article className="edit-profile-section-top">
            {hasProfileInfo && (
              <Link to="/profile">
                {theme ? (
                  <img src={arrowleftlight} alt="arrowleft-icon" />
                ) : (
                  <img src={arrowleft} alt="arrowleft-icon" />
                )}
              </Link>
            )}
            <h2>Edit Profile</h2>
          </article>
        </div>
        <EditProfileImage />
        <EditProfileInfo />
      </section>
    </>
  );
};

export default EditProfile;
