import "./CommentList.css";
import CommentItem from "../CommentItem/CommentItem";

const CommentList = ({ postData }) => {

  return (
    <>
      {postData ? (
        <section className="comments-section">
          {postData.comments.map((comment, index) => {
            return <CommentItem comment={comment} key={index} />;
          })}
        </section>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default CommentList;
