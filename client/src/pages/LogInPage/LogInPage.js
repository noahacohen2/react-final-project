import "./LogInPage.css";
import { useState } from 'react';
import UserAuthForm from "../../Components/UserAuthForm/UserAuthForm";
import AuthSideCard from "../../Components/AuthSideCard/AuthSideCard";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

const LogInPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState("");

    const changeLoginStatus = () => {
        setMessage("")
        setIsLogin(!isLogin)
    }
    return (
        <div className="logIn">
            <Card className="logInCard">
                <CardContent className="cardContent">
                    <UserAuthForm isLogin={isLogin} message={message} setMessage={setMessage}></UserAuthForm>
                    <AuthSideCard setMessage={setMessage} text={isLogin ? "Join To Olaf" : "Welcome Back"} btnText={isLogin ? "SIGN UP" : "SIGN IN"} switchState={changeLoginStatus}></AuthSideCard>
                </CardContent>
            </Card>
        </div>
    );
};

export default LogInPage;
