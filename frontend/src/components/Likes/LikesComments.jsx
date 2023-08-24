import "./Likes.css";
import HeartActive from "../../images/HeartActive.svg";
import HeartInActive from "../../images/HeartInactive.svg";
import { useEffect, useState, useContext } from "react";
import { RefreshContext } from "../../user/RefreshContext";
import axios from "axios";
import heartlight from "../../images/favorites-light.svg";
import { ThemeContext } from "../../user/ThemeContext";

const LikesComments = ({ amountOfLikes, commentId }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isLiking, setIsLiking] = useState();
  const [numberOfLikes, setNumberOfLikes] = useState(amountOfLikes);
  const { refresh, setRefresh } = useContext(RefreshContext);

  // get data of logged in user and save the state whether he/she is already liking that post
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/user/profile");
      let commentLikes = data.isLikingComments.filter(
        (commentID) => commentID == commentId
      );
      if (commentLikes.length > 0) {
        setIsLiking(true);
      }
    };
    fetchData();
  }, [refresh]);

  useEffect(() => {
    if (isLiking === true) {
      setNumberOfLikes(numberOfLikes + 1);
    } else if (isLiking === false) {
      setNumberOfLikes(amountOfLikes);
    }
  }, [isLiking]);

  const likeComment = async () => {
    const { data } = await axios.put(`/api/user/profile/comments/${commentId}`);
    setIsLiking(true);
    setRefresh((prev) => !prev);
  };

  const unLikeComment = async () => {
    const { data } = await axios.delete(
      `/api/user/profile/comments/${commentId}`
    );
    setIsLiking(false);
    setRefresh((prev) => !prev);
  };

  return (
    <div className="likes-wrapper">
      {theme ? (
        isLiking ? (
          <img
            src={HeartActive}
            alt="Likes"
            className="heart-icon"
            onClick={unLikeComment}
          />
        ) : (
          <img
            src={heartlight}
            alt="Likes"
            className="heart-icon"
            onClick={likeComment}
          />
        )
      ) : isLiking ? (
        <img
          src={HeartActive}
          alt="Likes"
          className="heart-icon"
          onClick={unLikeComment}
        />
      ) : (
        <img
          src={HeartInActive}
          alt="Likes"
          className="heart-icon"
          onClick={likeComment}
        />
      )}

      <p className="semibold-14">{numberOfLikes}</p>
    </div>
  );
};

export default LikesComments;
