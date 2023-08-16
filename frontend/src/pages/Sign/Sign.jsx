import Login from "../../user/Login";
import Signup from "../../user/Signup";
import EditProfile from "../EditProfile/EditProfile";
import "./Sign.css";

const Sign = () => {
  return (
    <>
      <Signup />
      <Login />
      <EditProfile />
    </>
  );
};

export default Sign;
