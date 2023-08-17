import './CommentItem.css'
import UserInfoComments from '../UserInfoComments/UserInfoComments';
import Likes from '../Likes/Likes';

const CommentItem = ({comment}) => {
    return ( 
        <article className='single-comment' >
            <UserInfoComments user={comment.user} />
            <p className='comment-text'>{comment.comment}</p>
            <figure className='comment-info'>
            <Likes amountOfLikes={comment.amountOfLikes}/>
            <p>Reply</p>
            <p className='profession'>{comment.time}</p>
            </figure>
        </article>
    );
}
 
export default CommentItem;