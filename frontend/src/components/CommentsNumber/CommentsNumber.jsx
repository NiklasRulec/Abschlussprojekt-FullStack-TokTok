import './CommentsNumber.css'
import CommentsIcon from '../../images/Comments.svg'
import { Link } from 'react-router-dom';

const CommentsNumber = ({ postId, post }) => {
  return (
    <div className="comments-wrapper">
      <Link to={`/home/${postId}`} >
      <img src={CommentsIcon} alt="Comments" className="comments-icon" />
      </Link>
      {post ? (
        <p className="semibold-14">{post.comments?.length}</p>
      ) : (
        <p className="semibold-14"></p>
      )}
    </div>
  );
};

export default CommentsNumber;
