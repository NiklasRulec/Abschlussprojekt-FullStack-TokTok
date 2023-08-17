import { useEffect, useState, useContext } from 'react';
import './Comments.css'
import { useParams } from 'react-router-dom';
import BackBtn from '../../components/BackBtn/BackBtn';
import { RefreshContext } from '../../user/RefreshContext'
import axios from 'axios';
import UserInfoBar from '../../components/UserInfoBar/UserInfoBar';
import Message from '../../images/Message.png'
import CommentInput from '../../components/CommentInput/CommentInput';
import CommentList from '../../components/CommentList/CommentList';
import Likes from '../../components/Likes/Likes';
import CommentsNumber from '../../components/CommentsNumber/CommentsNumber';

const Comments = () => {
    const params = useParams()
    const [postData, setPostData] = useState()
    const {refresh, setRefresh} = useContext(RefreshContext)

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/post/${params.id}`)
            setPostData(data)
        }
        fetchData()
    },[refresh])

    return ( 
        <>
        <div className='comments-header'>
            <div className='comments-header-left'>
                <BackBtn/>
                <h2>Comments</h2>
            </div>
        <img src={Message} alt="Message" />
        </div>

        {postData ? (
        <>
        <section className='post-detail-section'>
            <UserInfoBar post={postData} />
            <article className='post-detail-article'>
            <p className='caption'>{postData.caption}</p>
            <p className='profession'>{postData.time}</p>
            <figure className='post-detail-likes-and-comments'>
                <Likes amountOfLikes={postData.amountOfLikes}/>
                <CommentsNumber amountOfComments={postData.amountOfComments} />
            </figure>
            </article>
        </section>    
        <CommentList postData={postData} />
        <CommentInput postId={params.id} />
        </>
        ) : (
            <p>Lädt..</p>
        )}
        </>
    );
}
 
export default Comments;