import "./CommentItem.css";
import UserInfoComments from "../UserInfoComments/UserInfoComments";
import LikesComments from "../Likes/LikesComments";

const CommentItem = ({ comment }) => {
  return (
    <article className="single-comment">
      <UserInfoComments user={comment.user} />
      <p className="comment-text">{comment.comment}</p>
      <figure className="comment-info">
        <LikesComments amountOfLikes={comment.amountOfLikes} commentId={comment._id} />
        <p>Reply</p>
        <p className="profession">{comment.time}</p>
      </figure>
    </article>
  );
};

export default CommentItem;