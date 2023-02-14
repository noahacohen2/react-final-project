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
  const [isLoading, setLoading] = useContext(AppContext).isLoading;

  const changeViewState = () => {
    setShowReviews(!showReviews);
  };
  const getReviews = () => {
    if (user && user.localId) {
      reviewsService.getUserReviews(user.localId).then((res) => {
        setUserReviews(res.data);
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        setLoading(false);
      });
    }

  };

  useEffect(() => {
    setLoading(true);

    getReviews()
  }, [user]);

  return (
    <div>
      <UpBar></UpBar>
      <Card className="profileCard">
        <UserDetails
          onChangePassowrdClick={changeViewState}
          showBtn={showReviews}
          reviewsNumber={userReviews.length}
        ></UserDetails>
        <Divider orientation="vertical" flexItem></Divider>
        {showReviews && (
          <Reviews
            cardSize={425}
            reviews={userReviews}
            setReviews={setUserReviews}
            showActions={true}
            noDataText="You're probably new here, & you haven't reviewed any musicals yet"
            refreshReviews={getReviews}
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
