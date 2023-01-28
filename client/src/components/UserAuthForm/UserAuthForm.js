import "./UserAuthForm.css";
import { useRef, useContext } from "react";
import AppContext from "../../Context/Context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import authService from "../../services/auth.js";
import { useNavigate } from "react-router-dom";

const UserAuthForm = ({ isLogin, message, setMessage }) => {
  let googleImg = require("../../Assets/search.png");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const [userID, setUserID] = useContext(AppContext).userID;

  const clickHandler = () => {
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setMessage("");

    if (isLogin) {
      authService
        .LogIn({ email: enteredEmail, password: enteredPassword })
        .then((data) => {
          setUserID(data.localId);
          navigate("/AllMusicals", { replace: true });
        })
        .catch((err) => {
          setMessage("We couldn't find your account");
        });
    } else {
      authService
        .SignUp({ email: enteredEmail, password: enteredPassword })
        .then((data) => {
          navigate("/AllMusicals", { replace: true });
        })
        .catch((err) => {
          setMessage(
            "Try another email, note that the email must be a valid email"
          );
        });
    }
  };

  return (
    <div className="Form">
      <div className="formTitle">{isLogin ? "Sign In" : "Sign Up"}</div>
      <div className="centerElements">
        <div className="signWithBtn">
          <img className="buttonImg" src={googleImg} />
          {isLogin ? "sign in" : "sign up"} with google
        </div>
      </div>
      <div className="cardContainer">
        <div className="centerElements">
          <div className="textFieldContainer">
            <TextField
              label="Email"
              className="formTextField"
              size="small"
              fullWidth
              inputRef={emailInputRef}
            ></TextField>
            <TextField
              label="Password"
              className="formTextField"
              size="small"
              fullWidth
              inputRef={passwordInputRef}
            ></TextField>
          </div>
        </div>
        <div className="centerElements">
          {message != "" && <div className="errorMsg">{message}</div>}
        </div>
      </div>
      <div className="centerElements">
        <Button
          className="submitBtn"
          variant="contained"
          disableElevation
          onClick={clickHandler}
        >
          {isLogin ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    </div>
  );
};

export default UserAuthForm;