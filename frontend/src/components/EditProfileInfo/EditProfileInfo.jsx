import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfileInfo.css";
import axios from "axios";

const EditProfileInfo = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [profession, setProfession] = useState();
  const [birthday, setBirthday] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();
  const [website, setWebsite] = useState();
  const [hasNickname, setHasNickname] = useState(false)
  const [hasName, setHasName] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/profile`);
      // console.log(data);
      // setName(data.name);
      // setUsername(data.username);
      // setProfession(data.profession);
      // setBirthday(data.birthday);
      setEmail(data.email);
      // setPhone(data.phone);
      // setGender(data.gender);
      // setWebsite(data.domain);
      if (data.nickname){
        setHasNickname(true)
      }
      if (data.name){
        setHasName(true)
      }
    };
    fetchUser();
  }, []);

  const submitFunction = async (e) => {
    e.preventDefault();

    const userInfo = {
      name: name,
      nickname: username,
      profession: profession,
      birthday: birthday,
      email: email,
      phone: phone,
      gender: gender,
      domain: website,
    };

    try {
      const { data } = await axios.put("/api/user/profile", userInfo);
      console.log("updated");
      console.log(userInfo);
      navigate("/profile");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <article className="edit-profile-info-section">
        {!hasName && <p className="edit-profile-info-text">Please enter username and name.</p>}
        <form onSubmit={submitFunction}>
          {hasName ? (
            <input
              type="text"
              placeholder="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          {hasNickname ? (
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="text"
            placeholder="profession"
            id="profession"
            onChange={(e) => setProfession(e.target.value)}
          />
          <input
            type="date"
            placeholder="birthday"
            id="birthday"
            onChange={(e) => setBirthday(e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          /> */}
          <input
            type="text"
            placeholder="phone"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <select id="gender" onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="divers">Divers</option>
          </select>
          <input
            type="text"
            placeholder="website"
            id="website"
            onChange={(e) => setWebsite(e.target.value)}
          />
          <input type="submit" value="Update" className="update-btn" />
        </form>
      </article>
    </>
  );
};

export default EditProfileInfo;
