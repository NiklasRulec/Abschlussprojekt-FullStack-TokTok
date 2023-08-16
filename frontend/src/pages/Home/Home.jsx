import HomeUserList from '../../components/HomeUserList/HomeUserList';
import './Home.css'
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
  return ( 
    <>
    <div>
    {/* <img src="" alt="logo" /> */}
    <h1>TokTok</h1>
    </div>
    <HomeUserList/>
    <Navbar />
    </>
   );
}
 
export default Home;