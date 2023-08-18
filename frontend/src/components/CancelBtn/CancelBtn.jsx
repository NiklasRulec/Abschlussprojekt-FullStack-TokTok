import './CancelBtn.css'
import { useNavigate } from "react-router-dom";
import Cancel from "../../images/Cancel.svg"

const CancelBtn = () => {
    const navigate = useNavigate();

    const cancel = () => {
        navigate(-1);
    };

    return ( 
        <>
        <button className='cancelBtn' onClick={cancel}>
            <img src={Cancel} alt="back" />
        </button>
        </>
     );
}
 
export default CancelBtn;