import SearchItem from "../SearchItem/SearchItem";
import "./SearchList.css";
import profile from "../../images/Profile.svg";
import axios from "axios";
import { useEffect, useState } from "react";

const SearchList = ({ searchQuery }) => {
  const [usersData, setUsersData] = useState();
  const [loggedInUserId, setLoggedInUserId] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user`);
      setUsersData(data);
    };

    const fetchLoggedInUser = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      
      setLoggedInUserId(data._id);
    };
    fetchUser();
    fetchLoggedInUser();

  }, []);

  const filteredUsers = usersData?.filter(
    (item) =>
      item._id !== loggedInUserId &&
      (item.nickname?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        item.profession?.toLowerCase().includes(searchQuery?.toLowerCase()))
  );

  return (
    <>
      <article className="search-list">
        <div className="search-list-top">
          <img src={profile} alt="profile-icon" />
        </div>
        <div>
          {filteredUsers?.map((item, index) => (
            <SearchItem
              key={index}
              name={item.name}
              nickname={item.nickname}
              profession={item.profession}
              img={item.image?.url}
              id={item._id}
              item={item}
            />
          ))}
        </div>
      </article>
    </>
  );
};

export default SearchList;
