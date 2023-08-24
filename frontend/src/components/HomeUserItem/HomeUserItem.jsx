import "./HomeUserItem.css";
import { Link } from "react-router-dom";
import UserInfoBar from "../UserInfoBar/UserInfoBar";
import { useState, useEffect, useContext } from "react";
import { RefreshContext } from "../../user/RefreshContext";
import axios from "axios";
import LikesPosts from "../Likes/LikesPosts";
import CommentsNumber from "../CommentsNumber/CommentsNumber";
import { ThemeContext } from "../../user/ThemeContext";

const HomeUserItem = (props) => {
  const postId = props.post._id;
  const [postData, setPostData] = useState();
  const { refresh, setRefresh } = useContext(RefreshContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/post/${postId}`);
      setPostData(data);
    };
    fetchData();
  }, [refresh]);

  return (
    <article className="home-user-item">
      {postData ? <UserInfoBar post={postData} /> : <p></p>}
      <Link to={`/home/${props.post._id}`}>
        <img className="post-image" src={props.post.image.url} alt="" />
      </Link>
      <div className="home-user-item-bottom">
        <LikesPosts amountOfLikes={props.post.amountOfLikes} postId={postId} />
        <CommentsNumber
          amountOfComments={props.post.amountOfComments}
          postId={postId}
        />
      </div>
    </article>
  );
};

export default HomeUserItem;
