import "./SmallMoreMenu.css";
import Vector from "../../images/Vector.svg";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../user/UserContext";
import { ThemeContext } from "../../user/ThemeContext";
import deleteimg from "../../images/Cancel.svg";
import deleteimglight from "../../images/cancel-light.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SmallMoreMenu = ({ onClose }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, isLoggedIn, logout } = useContext(UserContext);
  const [slideOut, setSlideOut] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const [allowDelete, setAllowDelete] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      const post = await axios.get(`/api/post/${params.id}`);
      setLoggedUser(data);
      if (data._id == post.data.user._id) {
        setAllowDelete(true);
      } else {
        setAllowDelete(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (slideOut) {
      const animationTimeout = setTimeout(() => {
        onClose();
      }, 350);
      return () => clearTimeout(animationTimeout);
    }
  }, [slideOut, onClose]);

  const handleStrokeClick = () => {
    setSlideOut(true);
  };

  const deletePost = async () => {
    const { data } = await axios.delete(`/api/post/${params.id}`);
    navigate("/home");
  };

  return (
    <>
      <section
        className={
          theme
            ? `small-more-menu-menu-dark ${slideOut ? "slide-out-menu" : ""}`
            : `small-more-menu-menu-light ${slideOut ? "slide-out-menu" : ""}`
        }
      >
        <img
          src={Vector}
          alt="vector"
          className="stroke"
          onClick={handleStrokeClick}
        />
        <div className="delete">
          {theme ? (
            <img
              className="more-menu-icon"
              src={deleteimglight}
              alt="delete"
              onClick={deletePost}
            />
          ) : (
            <img
              className="more-menu-icon"
              src={deleteimg}
              alt="delete"
              onClick={deletePost}
            />
          )}

          <h5 className="semibold-18">Delete Post</h5>
        </div>
      </section>
      {showMoreMenu && <MoreMenu onClose={closeMoreMenu} />}
    </>
  );
};

export default SmallMoreMenu;
