import HomeUserList from '../../components/HomeUserList/HomeUserList';
import './Home.css'
import Navbar from '../../components/Navbar/Navbar';
import Logo from '../../images/Logo.png'

const Home = () => {
  return ( 
    <>
    <div>
    <img src={Logo} alt="logo" />
    <h1>TokTok</h1>
    </div>
    <HomeUserList/>
    <Navbar />
    </>
   );
}
 
export default Home;