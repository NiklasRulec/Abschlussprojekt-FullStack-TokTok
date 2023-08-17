import "./Upload.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../user/UserContext";
import axios from "axios";

import CancelBtn from "../../components/CancelBtn/CancelBtn";

import BackArrow from "../../images/ArrowLeft.png";
import Cam from "../../images/Camera.png";
import Category from "../../images/Category.png";
import Arrowdown from "../../images/Arrowdown2.png";

const Upload = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  //   const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      console.log(data);
      setLoggedUser(data);
    };
    fetchUser();
  }, []);

  const handleFileUpload = () => {
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  const closeBtnClick = () => {
    closePopup();
    window.location.reload();
  };

  return (
    <>
      {loggedUser ? (
        <section className={`upload-page ${showPopup ? "hidden-upload" : " "}`}>
          <div className="upload-wrapper">
            <article className="new-post">
              <CancelBtn />
              <h2>New Post</h2>
            </article>
            <article className="upload-window">
              <input
                type="file"
                className="custom-file-upload"
                title="Upload"
                onChange={handleFileUpload}
              />
            </article>

            <article className="gallery-list">
              <div className="gallery-top">
                <div className="gallery-arrow">
                  <h3>Gallery</h3>
                  <img src={Arrowdown} alt="" />
                </div>
                <div className="cam-category">
                  <img src={Category} alt="" />
                  <img src={Cam} alt="" />
                </div>
              </div>
              <div className="img-gallery">
                {loggedUser.posts.map((post, index) => (
                  <img
                    key={index}
                    src={post.image.url}
                    alt={`{post ${index}}`}
                  />
                ))}
              </div>
            </article>
          </div>
        </section>
      ) : (
        <h2>wird geladen...</h2>
      )}
      {showPopup && (
        <section className="popup">
          <article className="new-post">
            <button className="backBtn-popup" onClick={closeBtnClick}>
              <img src={BackArrow} alt="back" />
            </button>
            <h2>New Post</h2>
          </article>
          <article className="caption-upload-img"></article>
        </section>
      )}
    </>
  );
};

export default Upload;
