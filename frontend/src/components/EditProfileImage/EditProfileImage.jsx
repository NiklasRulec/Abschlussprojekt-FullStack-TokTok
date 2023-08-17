import "./EditProfileImage.css";
import axios from "axios";
import edit from "../../images/Edit Square.png";
import { useContext, useEffect, useState } from "react";
import { RefreshContext } from "../../user/RefreshContext";

const EditProfileImage = () => {
  const [loggedUser, setLoggedUser] = useState();
  const [email, setEmail] = useState();
  const { refresh, setRefresh } = useContext(RefreshContext);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      console.log(data);
      setLoggedUser(data);
      setEmail(data.email);
    };
    fetchUser();
  }, [refresh]);

  const imageFunction = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log(formData);
      const { data } = await axios.put("/api/user/profile/img", formData);
      console.log(data);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loggedUser ? (
        <article className="edit-profile-image-section">
          <div className="image-container">
            <form onSubmit={imageFunction}>
              <img
                src={loggedUser.image.url}
                alt="user-image"
                className="image"
              />
              <img src={edit} alt="edit-icon" />
              <input type="file" name="image" id="file" className="inputfile" />
              <button type="submit"> SUBMIT </button>
            </form>
          </div>
        </article>
      ) : (
        <h2>Lädt</h2>
      )}
    </>
  );
};

export default EditProfileImage;
