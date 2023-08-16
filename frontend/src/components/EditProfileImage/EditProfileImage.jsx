import "./EditProfileImage.css";
import edit from "../../images/Edit Square.png";

const EditProfileImage = () => {
  const imageFunction = () => {
    console.log("image updated");
  };
  return (
    <>
      <article className="edit-profile-image-section">
        <div className="image">
          <button onClick={imageFunction}>
            <img src={edit} alt="edit-icon" />
          </button>
        </div>
      </article>
    </>
  );
};

export default EditProfileImage;
