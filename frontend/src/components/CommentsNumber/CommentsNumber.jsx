import "./CommentsNumber.css";
import CommentsIcon from "../../images/Comments.svg";
import commentsdark from "../../images/comment-light.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../user/ThemeContext";

const CommentsNumber = ({ amountOfComments, postId }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="comments-wrapper">
      <Link to={`/home/${postId}`}>
        {theme ? (
          <img src={commentsdark} alt="Comments" className="comments-icon" />
        ) : (
          <img src={CommentsIcon} alt="Comments" className="comments-icon" />
        )}
      </Link>
      <p className="semibold-14">{amountOfComments}</p>
    </div>
  );
};

export default CommentsNumber;
