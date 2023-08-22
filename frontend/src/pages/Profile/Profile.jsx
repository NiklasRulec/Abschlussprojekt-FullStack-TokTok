import InfoBar from "../../components/InfoBar/InfoBar";
import Navbar from '../../components/Navbar/Navbar';
import './Profile.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import follow from "../../images/Follow.svg";
import feeds from "../../images/Feeds.svg";
import arrowleft from "../../images/ArrowLeft.svg";
import moremenu from "../../images/MoreMenu.svg";
import BackBtn from "../../components/BackBtn/BackBtn";

const Profile = () => {
  const params = useParams();
  const [userData, setUserData] = useState();
  const nav = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/${params.id}`);
      console.log(data[0]);
      setUserData(data[0]);
    };
    fetchUser();
  }, []);

  return (
    <>
    <InfoBar />
      {userData ? (
          <section className="profile-section">
            <div className="nav-fixed-wrapper">
              <article className="profile-top">
                <div className="profile-header-left">
                <BackBtn/>
                <h2>{userData.nickname}</h2>
                </div>
                <img src={moremenu} alt="moremenu-icon" />
              </article>
            </div>
            <img src={userData.image.url} alt="profilepic" className="profile-image"/>
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
            <button className="follow-btn">
              <img src={follow} alt="follow-icon" />
              Follow
            </button>
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
                    
                    <img src={post.image?.url} alt="post" key={index} className="post-image" onClick={() => nav(`/home/${post._id}`)}/>
                    
                  ))
                ) : (
                  <p>Lädt..</p>
                )}
     
              </div>
            </article>
          </section>
      ) : (
        <h2>Lädt</h2>
      )}
      <Navbar />
    </>
  );
};

export default Profile;
