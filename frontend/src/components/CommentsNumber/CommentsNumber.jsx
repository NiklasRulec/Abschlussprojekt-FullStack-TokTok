import './CommentsNumber.css'
import CommentsIcon from '../../images/Comments.svg'

const CommentsNumber = ({ amountOfComments }) => {
  return (
    <div className="comments-wrapper">
      <img src={CommentsIcon} alt="Comments" className="comments-icon" />
      <p className="semibold-14">{amountOfComments}</p>
    </div>
  );
};

export default CommentsNumber;
