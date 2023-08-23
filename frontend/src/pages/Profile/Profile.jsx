import InfoBar from "../../components/InfoBar/InfoBar";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import followIcon from "../../images/Follow.svg";
import feeds from "../../images/Feeds.svg";
import moremenu from "../../images/MoreMenu.svg";
import BackBtn from "../../components/BackBtn/BackBtn";
import { RefreshContext } from "../../user/RefreshContext";

const Profile = () => {
  const params = useParams();
  const [userData, setUserData] = useState();
  const nav = useNavigate();
  const [following, setFollowing] = useState();
  const { refresh, setRefresh } = useContext(RefreshContext);

  // get data of logged in user and save the state whether he/she is already following that other user
  useEffect(() => {
    const fetchData = async () => {
        const { data } = await axios.get("/api/user/profile")
        let isFollowing = data.isFollowing.filter((userId) =>  userId == params.id)
        if(isFollowing.length > 0){
          setFollowing(true)
        }
    }
    fetchData()
  },[refresh])

  // get data of userprofile by id
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/${params.id}`);
      setUserData(data[0]);
    };
    fetchUser();
  }, []);

  const follow = async () => {
    const userId = params.id
    const { data } = await axios.put(`/api/user/profile/following/${userId}`)
    setFollowing(true)
    setRefresh(prev => !prev)
  }

  const unFollow = async () => {
    const userId = params.id
    const { data } = await axios.delete(`/api/user/profile/following/${userId}`)
    setFollowing(false)
    setRefresh(prev => !prev)
  }

  return (
    <>
      {/* <InfoBar /> */}
      {userData ? (
        <section className="profile-section">
          <div className="nav-fixed-wrapper">
            <article className="profile-top">
              <div className="profile-header-left">
                <BackBtn />
                <h2>{userData.nickname}</h2>
              </div>
              <img src={moremenu} alt="moremenu-icon" />
            </article>

          </div>
          <img
            src={userData.image.url}
            alt="profilepic"
            className="profile-image"
          />
          <h2>{userData.name}</h2>
          <h4>{userData.profession}</h4>
          <p>{userData.description}</p>
          <a href={userData.domain}>{userData.domain}</a>
          <article className="profile-numbers">
            <div className="profile-numbers-block">
              <h2>{userData.amountOfPosts}</h2>
              <p>Posts</p>
            </div>
            <div className="small-vertical-line"></div>
            <div className="profile-numbers-block">
              <h2>{userData.amountOfFollowers}</h2>
              <p>Followers</p>
            </div>
            <div className="small-vertical-line"></div>
            <div className="profile-numbers-block">
              <h2>{userData.amountOfFollowing}</h2>
              <p>Following</p>
            </div>
          </article>

            {following ? (
            <button className="following-btn" onClick={unFollow}>
              Following
            </button>
          ) : (
            <button className="follow-btn" onClick={follow}>
              <img src={followIcon} alt="follow-icon" />
              Follow
            </button>
          )}

          <div className="horizontal-line"></div>
          <article className="profile-bottom">
            <div className="profile-bottom-buttons">
              <div className="feeds-btn">
                <img src={feeds} alt="feeds-icon" />
                <h5>Feeds</h5>
              </div>
            </div>
            <div className="profile-bottom-gallery">
              {userData ? (
                userData.posts?.map((post, index) => (
                  <img
                    src={post.image?.url}
                    alt="post"
                    key={index}
                    className="post-image"
                    onClick={() => nav(`/home/${post._id}`)}
                  />
                ))
              ) : (
                <p></p>
              )}
            </div>
          </article>
        </section>
      ) : (
        <h2></h2>
      )}
      <Navbar />
    </>
  );
};

export default Profile;
