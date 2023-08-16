import "./EditProfileImage.css";
import axios from "axios";
import edit from "../../images/Edit Square.png";
import { useEffect, useState } from "react";

const EditProfileImage = () => {
  const [loggedUser, setLoggedUser] = useState();

  const imageFunction = () => {
    console.log("image updated");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      console.log(data);
      setLoggedUser(data);
    };
    fetchUser();
  }, []);

  return (
    <>
      {loggedUser ? (
        <article className="edit-profile-image-section">
          <div className="image-container">
            <img
              src={loggedUser.image.url}
              alt="user-image"
              className="image"
            />
            <button onClick={imageFunction} className="image-edit-btn">
              <img src={edit} alt="edit-icon" />
            </button>
          </div>
        </article>
      ) : (
        <h2>Lädt</h2>
      )}
    </>
  );
};

export default EditProfileImage;
