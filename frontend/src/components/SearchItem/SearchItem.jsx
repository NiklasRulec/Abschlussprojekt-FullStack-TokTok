import "./SearchItem.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../images/Avatar.svg";
import { RefreshContext } from "../../user/RefreshContext";
import { ThemeContext } from "../../user/ThemeContext";
import axios from "axios";

const SearchItem = (props) => {
  const [following, setFollowing] = useState();
  const { refresh, setRefresh } = useContext(RefreshContext);
  const { theme, setTheme } = useContext(ThemeContext);

  // get data of logged in user and save the state whether he/she is already following that other user
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/user/profile");
      let isFollowing = data.isFollowing.filter((userId) => userId == props.id);
      if (isFollowing.length > 0) {
        setFollowing(true);
      }
    };
    fetchData();
  }, [refresh]);

  const follow = async () => {
    const { data } = await axios.put(`/api/user/profile/following/${props.id}`);
    setFollowing(true);
    setRefresh((prev) => !prev);
  };

  const unFollow = async () => {
    const { data } = await axios.delete(
      `/api/user/profile/following/${props.id}`
    );
    setFollowing(false);
    setRefresh((prev) => !prev);
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

        {theme ? (
          following ? (
            <button className="followingdark" onClick={unFollow}>
              Following
            </button>
          ) : (
            <button className="followdark" onClick={follow}>
              Follow
            </button>
          )
        ) : following ? (
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
