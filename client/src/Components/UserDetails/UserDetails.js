import "./UserDetails.css";
import { useContext } from "react";
import AppContext from "../../Context/Context";
import Button from "@mui/material/Button";

const UserDetails = ({ onChangePassowrdClick, showBtn, reviewsNumber }) => {
  const userDefaultImg = require("../../Assets/olafAvatar.jpg");
  const [user, setUser] = useContext(AppContext).user;

  return (
    <div>
      <div className="userDetails">
        <img className="avatarImg" src={userDefaultImg} />
        <div>
          <div className="userName">{user?.displayName}</div>
          <div className="musicalsNumber">Musicals: {reviewsNumber}</div>
        </div>
      </div>
      {showBtn && (
        <Button
          size="small"
          className="editPasswordBtn"
          variant="outlined"
          disableElevation
          onClick={onChangePassowrdClick}
        >
          edit password
        </Button>
      )}
    </div>
  );
};

export default UserDetails;
