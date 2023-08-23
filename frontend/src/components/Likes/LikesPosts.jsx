import './Likes.css'
import HeartActive from '../../images/HeartActive.svg'
import HeartInActive from '../../images/HeartInactive.svg'
import { useEffect, useState, useContext } from "react";
import { RefreshContext } from "../../user/RefreshContext";
import axios from "axios";

const LikesPosts = ({ amountOfLikes, postId }) => {
    const [isLiking, setIsLiking] = useState()
    const [numberOfLikes, setNumberOfLikes] = useState(amountOfLikes)
    const { refresh, setRefresh } = useContext(RefreshContext);
    
    // get data of logged in user and save the state whether he/she is already liking that post
    useEffect(() => {
      const fetchData = async () => {
        const { data } = await axios.get("/api/user/profile")
        let postLikes = data.isLikingPosts.filter((postID) =>  postID == postId)
        if(postLikes.length > 0){
          setIsLiking(true)
        }
        }
      fetchData()
    },[refresh])

  useEffect(() => {
    if (isLiking === true) {
      setNumberOfLikes(numberOfLikes + 1);
    } else if (isLiking === false) {
      setNumberOfLikes(amountOfLikes);
    }
  }, [isLiking]);

  const likePost = async () => {
    const { data } = await axios.put(`/api/user/profile/posts/${postId}`)
    setIsLiking(true)
    setRefresh(prev => !prev)
  }

  const unLikePost = async () => {
    const { data } = await axios.delete(`/api/user/profile/posts/${postId}`)
    setIsLiking(false)
    setRefresh(prev => !prev)
  }

  return (
    <div className="likes-wrapper">
      {isLiking ? (
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
      <p className="semibold-14">{numberOfLikes}</p>
    </div>
  );
};

export default LikesPosts;
