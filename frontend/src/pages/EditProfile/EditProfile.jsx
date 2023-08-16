import { Link } from "react-router-dom";
import EditProfileImage from "../../components/EditProfileImage/EditProfileImage";
import EditProfileInfo from "../../components/EditProfileInfo/EditProfileInfo";
import arrowleft from "../../images/ArrowLeft.png";
import "./EditProfile.css";

const EditProfile = () => {
  return (
    <>
      <section className="edit-profile-section">
        <article className="edit-profile-section-top">
          <Link to="">
            <img src={arrowleft} alt="arrowleft-icon" />
          </Link>
          <h2>Edit Profile</h2>
        </article>
        <EditProfileImage />
        <EditProfileInfo />
      </section>
    </>
  );
};

export default EditProfile;
