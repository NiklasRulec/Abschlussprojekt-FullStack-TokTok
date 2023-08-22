import { useState, useEffect, useContext } from "react";
import "./SearchItem.css";
import { Link } from 'react-router-dom'
import Avatar from '../../images/Avatar.svg'
import { RefreshContext } from "../../user/RefreshContext";
import axios from "axios";

const SearchItem = (props) => {
  const [following, setFollowing] = useState(false);
  const { refresh, setRefresh } = useContext(RefreshContext);

  const follow = async () => {
    const { data } = await axios.put(`/api/user/profile/following/${props.id}`)
    setRefresh(prev => !prev)
  }

  const unFollow = async () => {
    const { data } = await axios.delete(`/api/user/profile/following/${props.id}`)
    setRefresh(prev => !prev)
  }

    // get data of logged in user and save the state whether he/she is already following that other user
    useEffect(() => {
      setFollowing(false)
          const fetchData = async () => {
              const { data } = await axios.get("/api/user/profile")
              let isFollowing = data.isFollowing.filter((userId) =>  userId == props.id)
              if(isFollowing.length > 0){
                setFollowing(true)
              }
          }
          fetchData()
    },[refresh])

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

        {following ? (
          <button className="following" onClick={unFollow}>
            Following
          </button>
        ) : (
          <button className="follow" onClick={follow}>
            Follow
          </button>
        )}

      </article>
    </>
  );
};

export default SearchItem;
