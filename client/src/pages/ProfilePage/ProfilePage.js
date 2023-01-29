import "./ProfilePage.css"
import UserDetails from "../../Components/UserDetails/UserDetails";
import UpBar from "../../Components/UpBar/UpBar";
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Reviews from "../../Components/Reviews/Reviews"
import ChangePassword from "../../Components/ChangePassword/ChangePassword";
import { useState, useEffect, useContext } from 'react';
import reviewsService from "../../Services/reviews.js";
import AppContext from "../../Context/Context";

const ProfilePage = () => {
    let [showReviews, setShowReviews] = useState(true);
    let [userReviews, setUserReviews] = useState([]);
    const [user, setUser] = useContext(AppContext).user;


    // const userReviews = [
    //     {
    //         seat: "18A",
    //         rate: 3,
    //         musical: "Frozen",
    //         review: "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20"
    //     },
    //     {
    //         seat: "18A",
    //         rate: 5,
    //         musical: "Frozen",
    //         review: "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20"
    //     }, {
    //         seat: "18A",
    //         rate: 1,
    //         musical: "Frozen",
    //         review: "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20"
    //     },
    //     {
    //         seat: "18A",
    //         rate: 4,
    //         musical: "Frozen",
    //         review: "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20"
    //     },
    //     {
    //         seat: "18A",
    //         rate: 3,
    //         musical: "Frozen",
    //         review: "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20"
    //     },
    //     {
    //         seat: "18A",
    //         rate: 2,
    //         musical: "Frozen",
    //         review: "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20"
    //     },
    //     {
    //         seat: "18A",
    //         rate: 2,
    //         musical: "Frozen",
    //         review: "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20"
    //     }
    // ]

    const changeViewState = () => {
        setShowReviews(!showReviews)
    }

    useEffect(() => {
        const getReviews = (userID) => {
            reviewsService
                .getUserReviews(userID)
                .then((res) => {
                    setUserReviews(res.data);
                    console.log(res.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        getReviews(user.localId);
    }, []);

    return (
        <div>
            <UpBar></UpBar>
            <Card className="profileCard">
                <UserDetails onChangePassowrdClick={changeViewState} showBtn={showReviews}></UserDetails>
                <Divider orientation="vertical" flexItem></Divider>
                {showReviews && (<Reviews reviews={userReviews} setReviews={setUserReviews}></Reviews>)}
                {!showReviews && (<ChangePassword changeViewState={changeViewState}></ChangePassword>)}
            </Card>
        </div>
    );
};

export default ProfilePage;