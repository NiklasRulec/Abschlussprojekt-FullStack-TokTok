import "./CommentInput.css";
import { RefreshContext } from "../../user/RefreshContext";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

const CommentInput = ({ postId }) => {
  const { refresh, setRefresh } = useContext(RefreshContext);
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
    const { data } = await axios.put(`/api/post/${postId}`, commentData);
    setRefresh((prev) => !prev);
    e.target.reset();
  };

  return (
    <>
      <form onSubmit={PostComment} className="comment-input-form">
        <img
          src={userData?.image?.url}
          alt="profile-avatar"
          className="profile-avatar"
        />
        <input
          type="text"
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