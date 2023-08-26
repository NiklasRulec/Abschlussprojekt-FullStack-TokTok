import InfoBar from "../../components/InfoBar/InfoBar";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import followIcon from "../../images/Follow.svg";
import FollowDark from "../../images/FollowDark.svg";
import feeds from "../../images/Feeds.svg";
import moremenu from "../../images/MoreMenu.svg";
import moremenulight from "../../images/moremenu-light.svg";
import BackBtn from "../../components/BackBtn/BackBtn";
import { RefreshContext } from "../../user/RefreshContext";
import { ThemeContext } from "../../user/ThemeContext";
import Avatar from "../../images/Avatar.svg";

const Profile = () => {
  const params = useParams();
  const [userData, setUserData] = useState();
  const nav = useNavigate();
  const [following, setFollowing] = useState();
  const { refresh, setRefresh } = useContext(RefreshContext);
  const { theme, setTheme } = useContext(ThemeContext);

  // get data of logged in user and save the state whether he/she is already following that other user
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/user/profile");
      let isFollowing = data.isFollowing.filter(
        (userId) => userId == params.id
      );
      if (isFollowing.length > 0) {
        setFollowing(true);
      }
    };
    fetchData();
  }, [refresh]);

  // get data of userprofile by id
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/${params.id}`);
      setUserData(data[0]);
    };
    fetchUser();
  }, [refresh]);

  const follow = async () => {
    const otherUserId = params.id;
    const { data } = await axios.put(`/api/user/profile/follow/${otherUserId}`)
    setFollowing(true);
    setRefresh((prev) => !prev);
  };

  const unFollow = async () => {
    const otherUserId = params.id;
    const { data } = await axios.delete(`/api/user/profile/follow/${otherUserId}`)
    setFollowing(false);
    setRefresh((prev) => !prev);
  };

  return (
    <>
      {/* <InfoBar /> */}
      {userData ? (
        <section className="profile-section">
          <div
            className={
              theme ? "nav-fixed-wrapper-dark" : "nav-fixed-wrapper-light"
            }
          >
            <article className="profile-top">
              <div className="profile-header-left">
                <BackBtn />
                <h2>{userData.nickname}</h2>
              </div>
              {theme ? (
                <img src={moremenulight} alt="moremenu-icon" />
              ) : (
                <img src={moremenu} alt="moremenu-icon" />
              )}
            </article>
          </div>
          
          {userData.image ? (
              <img
                src={userData.image.url}
                alt="profilepic"
                className="profile-image"
              />
            ) : (
              <img src={Avatar} alt="" className="profile-image" />
            )}

          <h2>{userData.name}</h2>
          <h4>{userData.profession}</h4>
          <p>{userData.description}</p>
          <a href={userData.domain}>{userData.domain}</a>
          <article className="profile-numbers">
            <div className="profile-numbers-block">
              <h2>{userData.posts.length}</h2>
              <p>Posts</p>
            </div>
            <div className="small-vertical-line"></div>
            <div className="profile-numbers-block">
                {userData.followers? (
                  <h2>{userData.followers.length}</h2>
                ) : (
                    <h2>0</h2>
                )}
              <p>Followers</p>
            </div>
            <div className="small-vertical-line"></div>
            <div className="profile-numbers-block">
            {userData.isFollowing? (
                  <h2>{userData.isFollowing.length}</h2>
                ) : (
                    <h2>0</h2>
                )}
              <p>Following</p>
            </div>
          </article>


          {theme ? (
          following ? (
            <button className="following-btn-dark" onClick={unFollow}>
              Following
            </button>
          ) : (
            <button className="follow-btn-dark" onClick={follow}>
              <img src={FollowDark} alt="follow-icon" />
              Follow
            </button>
          )
        ) : following ? (
          <button className="following-btn-light" onClick={unFollow}>
            Following
          </button>
        ) : (
          <button className="follow-btn-light" onClick={follow}>
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
