import SearchItem from "../SearchItem/SearchItem";
import "./SearchList.css";
import profile from "../../images/Profile.png";
import axios from "axios";
import { useEffect, useState } from "react";

const SearchList = () => {
  const [usersData, setUsersData] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user`);
      console.log(data);
      setUsersData(data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <article className="search-list">
        <div className="search-list-top">
          <img src={profile} alt="profile-icon" />
        </div>
        <div>
          {usersData?.map((item, index) => (
            <SearchItem
              key={index}
              name={item.name}
              profession={item.profession}
              img={item.image?.url}
            />
          ))}
        </div>
      </article>
    </>
  );
};

export default SearchList;
