import "./EditProfile.css";
import InfoBar from "../../components/InfoBar/InfoBar";
import { Link } from "react-router-dom";
import EditProfileImage from "../../components/EditProfileImage/EditProfileImage";
import EditProfileInfo from "../../components/EditProfileInfo/EditProfileInfo";
import arrowleft from "../../images/ArrowLeft.svg";
import axios from "axios";
import { useState, useEffect } from "react";

const EditProfile = () => {
  const [hasProfileInfo, setHasProfileInfo] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      if(data.nickname && data.name){
        setHasProfileInfo(true)
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      {/* <InfoBar /> */}
      <section className="edit-profile-section">
        <div className="nav-fixed-wrapper">
        <article className="edit-profile-section-top">
          {hasProfileInfo && <Link to="/profile"><img src={arrowleft} alt="arrowleft-icon" /></Link>}
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
