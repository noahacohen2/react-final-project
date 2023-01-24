import "./AuthSideCard.css";
import Button from '@mui/material/Button';


const AuthSideCard = ({ text, switchState, btnText }) => {
    return (
        <div className="AuthSideCard">
            <div className="SideCardTextContainer">
                <div className="AuthSideCardText">{text}</div>
            </div>
            <div className="centerElements">
                <Button className="switchPageBtn" variant="outlined" disableElevation onClick={() => { switchState() }}>{btnText}</Button>
            </div>
        </div>
    );
};

export default AuthSideCard;
