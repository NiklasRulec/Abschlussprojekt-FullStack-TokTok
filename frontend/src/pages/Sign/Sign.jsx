import Login from "../../user/Login";
import Signup from "../../user/Signup";
import EditProfile from "../EditProfile/EditProfile";
import Profile from "../Profile/Profile";
import UserProfile from "../UserProfile/UserProfile";
import "./Sign.css";
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

const Sign = () => {

  return (
    <>
    {/* <LoadingScreen /> */}
      <Signup />
      <Login />
      <UserProfile />
    </>
  );
};

export default Sign;
