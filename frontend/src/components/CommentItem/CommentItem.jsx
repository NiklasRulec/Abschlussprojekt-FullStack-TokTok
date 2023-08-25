import "./CommentItem.css";
import UserInfoComments from "../UserInfoComments/UserInfoComments";
import LikesComments from "../Likes/LikesComments";

const CommentItem = ({ comment }) => {

  function formatTimeDifference(commentTime) {
    const now = new Date();
    const commentDate = new Date(commentTime);
    const differenceInMilliSec = now - commentDate;
      
    if (differenceInMilliSec < 60000) {
      return "now";
    } else if (differenceInMilliSec < 3600000) {
      const minutesAgo = Math.floor(differenceInMilliSec / 60000);
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (differenceInMilliSec < 86400000) {
      const hoursAgo = Math.floor(differenceInMilliSec / 3600000);
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (differenceInMilliSec < 604800000) {
      const daysAgo = Math.floor(differenceInMilliSec / 86400000);
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    } else if (now.getFullYear() === commentDate.getFullYear()) {
      const formattedDate = commentDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long'
      });
      return formattedDate;
    } else {
      const formattedDate = commentDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      return formattedDate;
    }
  }
    
  const formattedTimeDifference = formatTimeDifference(comment.time);

  return (
    <article className="single-comment">
      <UserInfoComments user={comment.user} />
      <p className="comment-text">{comment.comment}</p>
      <figure className="comment-info">
        <LikesComments amountOfLikes={comment.amountOfLikes} commentId={comment._id} />
        <p>Reply</p>
        <p className="profession">{formattedTimeDifference}</p>
      </figure>
    </article>
  );
};

export default CommentItem;