import "./Upload.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../user/UserContext";
import axios from "axios";
import InfoBar from "../../components/InfoBar/InfoBar";
import CancelBtn from "../../components/CancelBtn/CancelBtn";
import BackArrow from "../../images/ArrowLeft.png";
import Cam from "../../images/Camera.png";
import Category from "../../images/Category.png";
import Arrowdown from "../../images/Arrowdown2.png";
import Location from "../../images/Location.png";
import ToggleActive from "../../images/ToggleActive.png";
import ToggleInactive from "../../images/ToggleInactive.png";
import Settings from "../../images/Settings.png";

const Upload = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  const [newImage, setNewImage] = useState();
  const [captionExpanded, setCaptionExpanded] = useState(false);
  //   const {user, setUser} = useContext(UserContext);
  const [facebookToggle, setFacebookToggle] = useState(false);
  const [twitterToggle, setTwitterToggle] = useState(false);
  const [tumblrToggle, setTumblrToggle] = useState(false);

  const toggleClick = (toggleType) => {
    if (toggleType === "facebook") {
      setFacebookToggle(!facebookToggle);
    } else if (toggleType === "twitter") {
      setTwitterToggle(!twitterToggle);
    } else if (toggleType === "tumblr") {
      setTumblrToggle(!tumblrToggle);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      console.log(data);
      setLoggedUser(data);
    };
    fetchUser();
  }, []);

  const handleFileUpload = async () => {
    const { data } = await axios.get(`/api/user/profile`);
    console.log(data);
    setLoggedUser(data);

    if (data.posts && data.posts.length > 0) {
      const latestImage = data.posts[data.posts.length - 1].image.url;
      setNewImage(latestImage);
      setShowPopup(true);
    }
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
    <InfoBar />
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
          <article className="caption-upload-img">
            <img
              className="profile-upload-img"
              src={loggedUser.image.url}
              alt=""
            />
            <input
              type="text"
              className="caption-input"
              placeholder="Write a caption..."
            />
            {newImage && (
              <img src={newImage} alt="" className="new-post-img" />
            )}
          </article>
          <div className="stroke-upload"></div>
          <article className="location-upload">
            <img src={Location} alt="" className="location-img" />
            <h2 className="semibold-18">Add Location</h2>
          </article>
          <div className="stroke-upload"></div>
          <p className="semibold-18 post-to">Also post to</p>
          <div className="facebook-post">
            <p className="semibold-18">Facebook</p>
            <img
              className={`toggle-img ${facebookToggle ? "active" : ""}`}
              src={facebookToggle ? ToggleActive : ToggleInactive}
              alt=""
              onClick={() => toggleClick("facebook")}
            />
          </div>
          <div className="twitter-post">
            <p className="semibold-18">Twitter</p>
            <img
              className={`toggle-img ${twitterToggle ? "active" : ""}`}
              src={twitterToggle ? ToggleActive : ToggleInactive}
              alt=""
              onClick={() => toggleClick("twitter")}
            />
          </div>
          <div className="tumblr-post">
            <p className="semibold-18">Tumblr</p>
            <img
              className={`toggle-img ${tumblrToggle ? "active" : ""}`}
              src={tumblrToggle ? ToggleActive : ToggleInactive}
              alt=""
              onClick={() => toggleClick("tumblr")}
            />
          </div>
          <div className="stroke-upload"></div>
          <div className="advanced-settings">
            <img src={Settings} alt="" />
            <p className="semibold-18">Advanced Settings</p>
          </div>
        </section>
      )}
    </>
  );
};

export default Upload;