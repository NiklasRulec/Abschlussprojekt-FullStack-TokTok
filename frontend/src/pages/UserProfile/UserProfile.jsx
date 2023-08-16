import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";
import { UserContext } from "../../user/UserContext";

const UserProfile = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <h1>UserProfile</h1>
    </>
  );
};

export default UserProfile;
