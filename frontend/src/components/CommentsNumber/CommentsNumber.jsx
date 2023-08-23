import './CommentsNumber.css'
import CommentsIcon from '../../images/Comments.svg'
import { Link } from 'react-router-dom';

const CommentsNumber = ({ amountOfComments, postId }) => {
  return (
    <div className="comments-wrapper">
      <Link to={`/home/${postId}`} >
      <img src={CommentsIcon} alt="Comments" className="comments-icon" />
      </Link>
      <p className="semibold-14">{amountOfComments}</p>
    </div>
  );
};

export default CommentsNumber;
