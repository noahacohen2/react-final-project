import "./UserAuthForm.css";
import { useRef, useContext, useEffect } from "react";
import AppContext from "../../Context/Context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import authService from "../../Services/auth";
import { useNavigate } from "react-router-dom";

const UserAuthForm = ({ isLogin, message, setMessage }) => {
    let googleImg = require("../../Assets/search.png");
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const nameInputRef = useRef();
    const navigate = useNavigate();
    const [user, setUser] = useContext(AppContext).user;

    useEffect(() => {
        if (user) {
            navigate("/AllMusicals", { replace: true });
        }
    }, [user]);

    const clickHandler = () => {
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        let enteredName;

        setMessage("");

        if (isLogin) {
            authService
                .LogIn({ email: enteredEmail, password: enteredPassword })
                .then((data) => {
                    setUser(data);
                    navigate("/AllMusicals", { replace: true });
                })
                .catch((err) => {
                    setMessage("We couldn't find your account");
                });
        } else {
            enteredName = nameInputRef.current.value;

            if (enteredName == "") {
                setMessage("Please enter your name");
                return;
            }

            authService
                .SignUp({ email: enteredEmail, password: enteredPassword, name: enteredName })
                .then((signUpData) => {
                    setUser(signUpData);
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
                        {!isLogin && (<TextField
                            label="Name"
                            className="formTextField"
                            size="small"
                            fullWidth
                            inputRef={nameInputRef}
                        ></TextField>)}
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
