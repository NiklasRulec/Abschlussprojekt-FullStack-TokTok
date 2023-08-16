import "./EditProfileInfo.css";

const EditProfileInfo = () => {
  const submitFunction = (e) => {
    e.preventDefault();
    console.log("update");
  };
  return (
    <>
      <article className="edit-profile-info-section">
        <form onSubmit={submitFunction}>
          <input type="text" placeholder="name" id="name" />
          <input type="text" placeholder="username" id="username" />
          <input type="text" placeholder="profession" id="profession" />
          <input type="date" placeholder="birthday" id="birthday" />
          <input type="text" placeholder="email" id="email" />
          <input type="text" placeholder="phone" id="phone" />
          <select id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="divers">Divers</option>
          </select>
          <input type="text" placeholder="website" id="website" />
          <input type="submit" value="Update" className="update-btn" />
        </form>
      </article>
    </>
  );
};

export default EditProfileInfo;
