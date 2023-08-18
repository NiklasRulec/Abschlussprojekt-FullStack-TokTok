import './UserInfoBar.css'
import { useState } from 'react';
import MoreMenu from '../../images/MoreMenu.svg'
import { Link } from 'react-router-dom'

const UserInfoBar = (props) => {
    const [userData, setUserData] = useState(props.post.user)

    return ( 
        <>
            { userData ? (
                <figure className='user-info-bar'>
                <div className='user-info-left'>
                    <Link to={`/profile/${props.post.user._id}`}>
                        <img className="profile-avatar" src={userData.image.url} alt="profile-avatar" />
                    </Link>
                <div className='user-info-text'>
                    <h4>{userData.nickname}</h4>
                    <p className='profession'>{userData.profession}</p>
                </div>
                </div>
                <img  className="more-menu" src={MoreMenu} alt="MoreMenu" />
            </figure>
            ) : (
                <p>Lädt..</p>
            )}
        </>
     );
}
 
export default UserInfoBar;