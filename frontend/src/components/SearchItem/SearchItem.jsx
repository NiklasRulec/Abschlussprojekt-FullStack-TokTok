import { useState } from "react";
import "./SearchItem.css";

const SearchItem = (props) => {
  const [followStatus, setFollowStatus] = useState(false);

  const followToggle = () => {
    setFollowStatus((prev) => !prev);
  };

  return (
    <>
      <article className="search-item">
        {props.img ? (
          <img src={props.img} alt="user-img" />
        ) : (
          <div className="image">IMG</div>
        )}

        <div className="search-item-text">
          <h3>{props.name}</h3>
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
