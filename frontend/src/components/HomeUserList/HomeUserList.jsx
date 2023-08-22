import axios from "axios";
import { useEffect, useState, useContext } from "react";
import HomeUserItem from "../HomeUserItem/HomeUserItem";
import { RefreshContext } from "../../user/RefreshContext";
import "./HomeUserList.css";

const HomeUserList = () => {
  const [postData, setPostData] = useState([]);
  const { refresh, setRefresh } = useContext(RefreshContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/post/");
      console.log(data);
      const sortedData = [...data].sort((a, b) => {
        // b.time - a.time
        // a.time.localeCompare(b.time)
      })
      console.log(sortedData);
      setPostData(data);
    };
    fetchData();
  }, [refresh]);

  return (
    <section className="home-user-list-section">
      {postData ? (
        postData.map((post, index) => {
          return <HomeUserItem post={post} key={index} />;
        })
      ) : (
        <p>Lädt..</p>
      )}
    </section>
  );
};

export default HomeUserList;
