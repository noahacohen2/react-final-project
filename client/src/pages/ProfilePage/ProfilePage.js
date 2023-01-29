import "./ProfilePage.css";
import UserDetails from "../../Components/UserDetails/UserDetails";
import UpBar from "../../Components/UpBar/UpBar";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Reviews from "../../Components/Reviews/Reviews";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";
import { useState } from "react";

const ProfilePage = () => {
  let [showReviews, setShowReviews] = useState(true);
  const userReviews = [
    {
      seat: "18A",
      rate: 3,
      musical: "Frozen",
      review:
        "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20",
    },
    {
      seat: "18A",
      rate: 5,
      musical: "Frozen",
      review:
        "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20",
    },
    {
      seat: "18A",
      rate: 1,
      musical: "Frozen",
      review:
        "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20",
    },
    {
      seat: "18A",
      rate: 4,
      musical: "Frozen",
      review:
        "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20",
    },
    {
      seat: "18A",
      rate: 3,
      musical: "Frozen",
      review:
        "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20",
    },
    {
      seat: "18A",
      rate: 2,
      musical: "Frozen",
      review:
        "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20",
    },
    {
      seat: "18A",
      rate: 2,
      musical: "Frozen",
      review:
        "Seat A19 is the end seat to an aisle so good for people that need the extra room to the right for leg stretch etc.rnExcellent views from A19 and A20",
    },
  ];

  const changeViewState = () => {
    setShowReviews(!showReviews);
  };
  return (
    <>
      <UpBar />
      <Card className="profileCard">
        <UserDetails
          onChangePassowrdClick={changeViewState}
          showBtn={showReviews}
        />
        <Divider orientation="vertical" flexItem></Divider>
        {showReviews && <Reviews reviews={userReviews}></Reviews>}
        {!showReviews && (
          <ChangePassword changeViewState={changeViewState}></ChangePassword>
        )}
      </Card>
    </>
  );
};

export default ProfilePage;
