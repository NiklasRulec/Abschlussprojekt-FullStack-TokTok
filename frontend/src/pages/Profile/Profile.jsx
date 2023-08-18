import InfoBar from "../../components/InfoBar/InfoBar";
import Navbar from '../../components/Navbar/Navbar';
import './Profile.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import follow from "../../images/Follow.svg";
import feeds from "../../images/Feeds.svg";
import arrowleft from "../../images/ArrowLeft.svg";
import moremenu from "../../images/MoreMenu.svg";

const Profile = () => {
  const params = useParams();
  const [userData, setUserData] = useState();

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
            <article className="profile-top">
              <img src={arrowleft} alt="arrowleft-icon" />
              <h2>{userData.name}</h2>
              <img src={moremenu} alt="moremenu-icon" />
            </article>
            <div className="image">Image</div>
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
                <div className="placeholder-image">Placeholder</div>
                <div className="placeholder-image">Placeholder</div>
                <div className="placeholder-image">Placeholder</div>
                <div className="placeholder-image">Placeholder</div>
                <div className="placeholder-image">Placeholder</div>
                <div className="placeholder-image">Placeholder</div>
                <div className="placeholder-image">Placeholder</div>
                <div className="placeholder-image">Placeholder</div>
                <div className="placeholder-image">Placeholder</div>
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
