import "./EditProfileImage.css";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import edit from "../../images/edit-img.svg";
import { RefreshContext } from "../../user/RefreshContext";
import Avatar from "../../images/Avatar.svg";

const EditProfileImage = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState();
  const [email, setEmail] = useState();
  const { refresh, setRefresh } = useContext(RefreshContext);
  const fileInputRef = useRef(null);
  const [hasProfileInfo, setHasProfileInfo] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      setLoggedUser(data);
      setEmail(data.email);
      if (data.nickname && data.name) {
        setHasProfileInfo(true);
      }
    };
    fetchUser();
  }, [refresh]);

  const imageFunction = async (formData) => {
    try {
      const { data } = await axios.put("/api/user/profile/img", formData);
      setRefresh((prev) => !prev);
      if (hasProfileInfo){ navigate("/profile"); }
      else { return } 
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = () => {
    const formData = new FormData();
    formData.append("image", fileInputRef.current.files[0]);
    imageFunction(formData);
  };

  return (
    <>
      {loggedUser ? (
        <article className="edit-profile-image-section">
          <div className="image-container">
            <form>
              {loggedUser.image ? (
                <img
                  src={loggedUser.image?.url}
                  alt="user-image"
                  className="user-image"
                />
              ) : (
                <img src={Avatar} alt="user-image" className="user-image" />
              )}
                  <img src={edit} alt="edit-icon" className="image-edit-btn" />
                  <input
                    type="file"
                    name="image"
                    id="file"
                    className="inputfile"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
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