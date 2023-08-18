// import MoreMenu from "../../components/MoreMenu/MoreMenu";
import InfoBar from "../../components/InfoBar/InfoBar";
import HomeUserList from '../../components/HomeUserList/HomeUserList';
import './Home.css'
import Navbar from '../../components/Navbar/Navbar';
import Logo from '../../images/Logo.svg'


const Home = () => {
  return (
    <>
      <InfoBar />
      {/* <MoreMenu /> */}
    <div>
    <img src={Logo} alt="logo" />
    <h1>TokTok</h1>
    </div>
    <HomeUserList/>
    <Navbar />
    </>
  );
};

export default Home;
