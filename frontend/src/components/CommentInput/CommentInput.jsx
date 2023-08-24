import "./CommentInput.css";
import { RefreshContext } from "../../user/RefreshContext";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Avatar from "../../images/Avatar.svg";
import { ThemeContext } from "../../user/ThemeContext";

const CommentInput = ({ postId }) => {
  const { refresh, setRefresh } = useContext(RefreshContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [commentInput, setCommentInput] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      setUserData(data);
    };
    fetchData();
  }, []);

  const PostComment = async (e) => {
    e.preventDefault();
    const commentData = {
      user: userData._id,
      comment: commentInput,
      time: "1 minute ago",
      amountOfLikes: 0,
    };
    const { data } = await axios.put(`/api/post/comments/${postId}`, commentData);
    setRefresh((prev) => !prev);
    e.target.reset();

    const commentElements = document.querySelectorAll('.single-comment');

    if (commentElements.length > 0) {
      const lastCommentElement = commentElements[commentElements.length - 2];
      setTimeout(() => {
        lastCommentElement.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  return (
    <>
      <form
        onSubmit={PostComment}
        className={
          theme ? "comment-input-form-dark" : "comment-input-form-light"
        }
      >
        {userData?.image ? (
          <img
            src={userData?.image?.url}
            alt="profile-avatar"
            className="profile-avatar"
          />
        ) : (
          <img src={Avatar} alt="profile-avatar" className="profile-avatar" />
        )}
        <textarea
          className="comment-input"
          placeholder="Your comment..."
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button type="submit" className="post-btn">
          Post
        </button>
      </form>
    </>
  );
};

export default CommentInput;
