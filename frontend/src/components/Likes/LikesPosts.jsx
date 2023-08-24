import "./Likes.css";
import HeartActive from "../../images/HeartActive.svg";
import HeartInActive from "../../images/HeartInactive.svg";
import { useEffect, useState, useContext } from "react";
import { RefreshContext } from "../../user/RefreshContext";
import axios from "axios";
import { ThemeContext } from "../../user/ThemeContext";
import heartlight from "../../images/favorites-light.svg";

const LikesPosts = ({ amountOfLikes, postId }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isLiking, setIsLiking] = useState();
  const [numberOfLikes, setNumberOfLikes] = useState(amountOfLikes);
  const { refresh, setRefresh } = useContext(RefreshContext);
  const [postData, setPostData] = useState();

  // get data of logged in user and save the state whether he/she is already liking that post
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/user/profile");
      let postLikes = data.isLikingPosts.filter((postID) => postID == postId);
      if (postLikes.length > 0) {
        setIsLiking(true);
      }
    };
    fetchData();
  }, [refresh]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/post/${postId}`);
      setPostData(data);
    };
    fetchData();
  }, [refresh]);


  const likePost = async () => {
    const { dataUser } = await axios.put(`/api/user/profile/posts/${postId}`);
    const { dataPost } = await axios.put(`/api/post/likes/${postId}`)
    setIsLiking(true);
    setRefresh((prev) => !prev);
  };

  const unLikePost = async () => {
    const { dataUser } = await axios.delete(`/api/user/profile/posts/${postId}`);
    const { dataPost } = await axios.delete(`/api/post/likes/${postId}`)
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
            onClick={unLikePost}
          />
        ) : (
          <img
            src={heartlight}
            alt="Likes"
            className="heart-icon"
            onClick={likePost}
          />
        )
      ) : isLiking ? (
        <img
          src={HeartActive}
          alt="Likes"
          className="heart-icon"
          onClick={unLikePost}
        />
      ) : (
        <img
          src={HeartInActive}
          alt="Likes"
          className="heart-icon"
          onClick={likePost}
        />
      )}

      {postData?.likes ? (
        <p className="semibold-14">{postData.likes?.length}</p>
      ) : (
        <p className="semibold-14">0</p>
      )}
    </div>
  );
};

export default LikesPosts;
