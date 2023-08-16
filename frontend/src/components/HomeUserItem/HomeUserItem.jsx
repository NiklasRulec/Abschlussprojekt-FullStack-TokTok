import axios from 'axios'
import './HomeUserItem.css'
import { useEffect, useState, useContext } from 'react'
import { RefreshContext } from '../../user/RefreshContext'

const HomeUserItem = (props) => {
    const userId = props.post.user
    const [userData, setUserData] = useState()
    const {refresh, setRefresh} = useContext(RefreshContext)

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/user/${userId}`)
            setUserData(data)
        }
        fetchData()
    },[refresh])

    return ( 
        <article className='HomeUserItem'>
            { userData ? (
                <figure className='user-info-bar'>
                <div>
                <img className="profile-avatar" src="" alt="" />
                <div>
                    <h4>{userData[0].name}</h4>
                    <p>{userData[0].profession}</p>
                </div>
                </div>
            </figure>
            ) : (
                <p>Lädt..</p>
            )}

            <img className='post-image' src={props.post.image.url} alt="" />

            <div className='likes-wrapper'>
            {/* icon */}
            <p className='semibold-14'>{props.post.amountOfLikes}</p>
            </div>
            <div className='comments-wrapper'>
            {/* icon */}
            <p className='semibold-14'>{props.post.amountOfComments}</p>
            </div>

        </article>
     );
}
 
export default HomeUserItem;