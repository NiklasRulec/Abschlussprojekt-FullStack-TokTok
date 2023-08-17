import './Likes.css'
import HeartActive from '../../images/HeartActive.png'
import HeartInActive from '../../images/HeartInActive.png'
import { useEffect, useState } from 'react'

const Likes = ({amountOfLikes}) => {
    const [isLiking, setIsLiking] = useState(false)
    const [numberOfLikes, setNumberOfLikes] = useState(amountOfLikes)

    useEffect(() => {
        if(isLiking === true){
            setNumberOfLikes(numberOfLikes + 1)
        } else if(isLiking === false){
            setNumberOfLikes(amountOfLikes)
        }
    },[isLiking])

    return ( 
        <div className='likes-wrapper'>
            {isLiking ? (
        <img src={HeartActive} alt="Likes" className='heart-icon' onClick={() => setIsLiking(prev => !prev)}/>
            ):(
        <img src={HeartInActive} alt="Likes" className='heart-icon' onClick={() => setIsLiking(prev => !prev)}/>
            )}
        <p className='semibold-14'>{numberOfLikes}</p>
        </div>
    );
}
 
export default Likes;