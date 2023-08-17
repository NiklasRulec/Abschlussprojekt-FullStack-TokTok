import "./BackBtn.css";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../images/ArrowLeft.png"

const BackBtn = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <button className='backBtn' onClick={goBack}>
            <img src={BackArrow} alt="back" />
        </button>
    );
}

export default BackBtn;
