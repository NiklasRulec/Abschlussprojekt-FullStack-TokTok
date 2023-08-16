import SearchItem from "../../components/SearchItem/SearchItem";
import SearchList from "../../components/SearchList/SearchList";
import Login from "../../user/Login";
import Signup from "../../user/Signup";
import "./Sign.css";

const Sign = () => {
  return (
    <>
      <Signup />
      <Login />
      <SearchList />
    </>
  );
};

export default Sign;
