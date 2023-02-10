import "./ProfilePage.css";
import UserDetails from "../../Components/UserDetails/UserDetails";
import UpBar from "../../Components/UpBar/UpBar";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Reviews from "../../Components/Reviews/Reviews";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";
import { useState, useEffect, useContext } from "react";
import reviewsService from "../../Services/reviews.js";
import AppContext from "../../Context/Context";

const ProfilePage = () => {
  let [showReviews, setShowReviews] = useState(true);
  let [userReviews, setUserReviews] = useState([]);
  const [user, setUser] = useContext(AppContext).user;

  const changeViewState = () => {
    setShowReviews(!showReviews);
  };

  useEffect(() => {
    const getReviews = (userID) => {
      reviewsService
        .getUserReviews(userID)
        .then((res) => {
          setUserReviews(res.data);
          console.log(res.data);
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
        <UserDetails
          onChangePassowrdClick={changeViewState}
          showBtn={showReviews}
        ></UserDetails>
        <Divider orientation="vertical" flexItem></Divider>
        {showReviews && (
          <Reviews
            cardSize={425}
            reviews={userReviews}
            setReviews={setUserReviews}
            showActions={true}
          ></Reviews>
        )}
        {!showReviews && (
          <ChangePassword changeViewState={changeViewState}></ChangePassword>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;
