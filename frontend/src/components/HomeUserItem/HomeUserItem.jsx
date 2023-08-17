import './HomeUserItem.css'
import { Link } from 'react-router-dom'
import UserInfoBar from '../UserInfoBar/UserInfoBar'
import { useState, useEffect, useContext } from 'react'
import { RefreshContext } from '../../user/RefreshContext'
import axios from 'axios'
import Likes from '../Likes/Likes'
import CommentsNumber from '../CommentsNumber/CommentsNumber'

const HomeUserItem = (props) => {
    const postId = props.post._id
    const [postData, setPostData] = useState()
    const {refresh, setRefresh} = useContext(RefreshContext)

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/post/${postId}`)
            setPostData(data)
            console.log(data);
        }
        fetchData()
    },[refresh])

    return ( 
        <article className='HomeUserItem'>
            {postData ? (
            <UserInfoBar post={postData} />
            ) : (
                <p></p>
            )}
            <Link to={`/home/${props.post._id}`}>
            <img className='post-image' src={props.post.image.url} alt="" />
            </Link>
            <Likes amountOfLikes={props.post.amountOfLikes} />
            <CommentsNumber amountOfComments={props.post.amountOfComments} />
        </article>
     );
}
 
export default HomeUserItem;