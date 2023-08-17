import './Likes.css'
import HeartActive from '../../images/HeartActive.png'
import HeartInActive from '../../images/HeartInActive.png'
import { useState } from 'react'

const Likes = ({amountOfLikes}) => {
    const [isLiking, setIsLiking] = useState(false)


    return ( 
        <div className='likes-wrapper'>
        <img src={HeartInActive} alt="Likes" className='heart-icon' />
        <p className='semibold-14'>{amountOfLikes}</p>
        </div>
     );
}
 
export default Likes;