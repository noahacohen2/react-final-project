import "./ChangePassword.css";
import { useRef, useContext, useState } from "react";
import AppContext from "../../Context/Context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import authService from "../../Services/auth";

const ChangePassword = ({ changeViewState }) => {
  const passwordInputRef = useRef();
  const confirmInputRef = useRef();

  const [user, setUser] = useContext(AppContext).user;
  const [message, setMessage] = useState("");

  const onCancelClickHandler = () => {
    changeViewState();
  };

  const saveHandler = () => {
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirm = confirmInputRef.current.value;

    if (enteredConfirm != enteredPassword) {
      setMessage("Both passwords should be the same");
    } else if (enteredPassword.length < 6) {
      setMessage("Password should be at least 6 characters");
    } else {
      authService
        .ChangePassword(user, enteredPassword)
        .then((data) => {
          setUser(data);
          setMessage("");
          changeViewState();
        })
        .catch((err) => {
          setMessage("We couldn't change your password");
        });
    }
  };

  return (
    <div className="Form" >
      <div className="passwordFormTitle">Change password</div>
      <div className="cardContainer">
        <div className="centerElements">
          <div className="textFieldContainer">
            <TextField label="Password" className="formTextField" size="small" fullWidth inputRef={passwordInputRef}></TextField>
            <TextField label="Confirm password" className="formTextField" size="small" fullWidth inputRef={confirmInputRef}></TextField>
          </div>
        </div>
        <div className="centerElements">
          {message != '' && (<div className="errorMsg">{message}</div>)}
        </div>
      </div>
      <div className="centerElements">
        <Button
          className="passowrd-cancel-btn"
          variant="outlined"
          disableElevation
          onClick={onCancelClickHandler}
        >
          cancel
        </Button>
        <Button
          className="password-submit-btn"
          variant="contained"
          disableElevation
          onClick={saveHandler}
        >
          Save
        </Button>
      </div>
    </div >
  );
};

export default ChangePassword;
