import "./UserDetails.css";
import { useContext } from "react";
import AppContext from "../../Context/Context";
import Button from "@mui/material/Button";

const UserDetails = ({ onChangePassowrdClick, showBtn }) => {
  const userDefaultImg = require("../../Assets/olafAvatar.jpg");
  const [user, setUser] = useContext(AppContext).user;

  const splitEmail = () => {
    return user.email.split("@")[0];
  };

  return (
    <div>
      <div className="userDetails">
        <img className="avatarImg" src={userDefaultImg} />
        <div>
          <div className="userName">{splitEmail()}</div>
          <div className="musicalsNumber">Musicals: 5</div>
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
