import "./Upload.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import InfoBar from "../../components/InfoBar/InfoBar";
import CancelBtn from "../../components/CancelBtn/CancelBtn";
import BackArrow from "../../images/ArrowLeft.svg";
import Cam from "../../images/Camera.svg";
import Category from "../../images/Category.svg";
import Arrowdown from "../../images/ArrowDown2.svg";
import Location from "../../images/Location.svg";
import ToggleActive from "../../images/ToggleActive.svg";
import ToggleInactive from "../../images/ToggleInactive.svg";
import Settings from "../../images/Settings.svg";
import Avatar from '../../images/Avatar.svg'

const Upload = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  const [uploadedImage, setUploadedImage] = useState();
  const [facebookToggle, setFacebookToggle] = useState(false);
  const [twitterToggle, setTwitterToggle] = useState(false);
  const [tumblrToggle, setTumblrToggle] = useState(false);
  const caption = useRef()

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

  const postImage = async () => {
    const formData = new FormData();
    formData.append("image", uploadedImage)
    formData.append("caption", caption.current.value)
    try {
      const response = await axios.post("/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      // console.log(response.data);
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
    }
  }

const handleFileUpload = (event) => {
  const uploadedFile = event.target.files[0];
  setUploadedImage(uploadedFile);
  setShowPopup(true);
}

  const closePopup = () => {
    setShowPopup(false);
  };

  const closeBtnClick = () => {
    setUploadedImage()
    closePopup();
    window.location.reload();
  };

  return (
    <>
      {/* <InfoBar /> */}
      {loggedUser ? (
        <section className={`upload-page ${showPopup ? "hidden-upload" : " "}`}>
          <div className="upload-wrapper">
            <div className="nav-fixed-wrapper">
              <article className="new-post">
                <CancelBtn />
                <h2>New Post</h2>
              </article>

            </div>
            <article className="upload-window">
              <div className="custom-upload-btn">
                <input
                  type="file"
                  id="custom-file-upload"
                  name="file-input"
                  onChange={handleFileUpload}
                />
                <label id="file-input-label" htmlFor="custom-file-upload">Upload</label>
              </div>
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
                {loggedUser?.gallery?.map((pic, index) => (
                  <img
                    key={index}
                    src={pic.url}
                    alt={`{pic ${index}}`}
                  />
                ))}
              </div>
            </article>
          </div>
        </section>
      ) : (
        <h2></h2>
      )}
      {showPopup && (
        <section className="popup">
          <div className="nav-fixed-wrapper">
            <article className="new-post">
              <button className="backBtn-popup" onClick={closeBtnClick}>
                <img src={BackArrow} alt="back" />
              </button>
              <h2>New Post</h2>
            </article>

          </div>
          <article className="caption-upload-img">
            {loggedUser.image ? (
              <img
                className="profile-upload-img"
                src={loggedUser.image?.url}
                alt=""
              />
            ) : (
            <img
              className="profile-upload-img"
              src={Avatar}
              alt=""
            />
            )}
            <textarea
              type="text"
              className="caption-input"
              placeholder="Write a caption..."
              ref={caption}
              onChange={(e) => {
                const element = e.target;
                element.style.height = "auto";
                element.style.height = `${element.scrollHeight}px`;
              }}
            />
            {uploadedImage && (
              <img src={URL.createObjectURL(uploadedImage)} alt="" className="new-post-img" />
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
          <div className="post-upload-button">
              <button className="semibold-18 post-btn-upload" onClick={postImage}>Post</button>
          </div>
        </section>
      )}
    </>
  );
};

export default Upload;
