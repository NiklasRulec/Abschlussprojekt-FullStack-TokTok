import { useState } from "react";
import "./SearchItem.css";
import { Link } from 'react-router-dom'
import Avatar from '../../images/Avatar.svg'

const SearchItem = (props) => {
  const [followStatus, setFollowStatus] = useState(false);

  const followToggle = () => {
    setFollowStatus((prev) => !prev);
  };

  return (
    <>
      <article className="search-item">
        <Link to={`/profile/${props.id}`}>
        {props.img ? (
          <img src={props.img} alt="user-img" />
        ) : (
          <img src={Avatar} alt="user-img" />
        )}
        </Link>

        <div className="search-item-text">
          <h3>{props.nickname}</h3>
          <p>{props.profession}</p>
        </div>
        {followStatus ? (
          <button className="following" onClick={followToggle}>
            Following
          </button>
        ) : (
          <button className="follow" onClick={followToggle}>
            Follow
          </button>
        )}
      </article>
    </>
  );
};

export default SearchItem;
