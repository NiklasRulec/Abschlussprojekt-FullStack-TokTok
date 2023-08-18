import "./CommentItem.css";
import UserInfoComments from "../UserInfoComments/UserInfoComments";
import HeartActive from "../../images/HeartActive.png";
import HeartInActive from "../../images/HeartInActive.png";
import Likes from "../Likes/Likes";

const CommentItem = ({ comment }) => {
  return (
    <article className="single-comment">
      <UserInfoComments user={comment.user} />
      <p className="comment-text">{comment.comment}</p>
      <figure className="comment-info">
        <Likes amountOfLikes={comment.amountOfLikes} />

        {/* <div className='likes-wrapper'>
            <img src={HeartInActive} alt="Likes" />
            <p className='semibold-14'>{comment.amountOfLikes}</p>
            </div> */}

        <p>Reply</p>
        <p className="profession">{comment.time}</p>
      </figure>
    </article>
  );
};

export default CommentItem;
