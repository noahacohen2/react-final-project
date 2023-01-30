import * as React from "react";
import AppContext from "../../Context/Context";
import { useContext, useState, useEffect } from "react";
import UpBar from "../../Components/UpBar/UpBar";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import "./MusicalPage.css";
import Grid from "@mui/material/Grid";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MusicalRatingChart from "../../Components/MusicalRatingChart/MusicalRatingChart";
import Reviews from "../../Components/Reviews/Reviews";
import reviewsService from "../../services/reviews";

const MusicalPage = () => {
  const [currentMusicalId, setCurrentMusicalId] =
    useContext(AppContext).currentMusical;
  const [musicals, setMusicals] = useContext(AppContext).musicals;
  const [currMusical, setCurrMusical] = useState();
  const [musicalReviews, setMusicalReviews] = useState();
  const [user, setUser] = useContext(AppContext).user;

  useEffect(() => {
    const musical = musicals.find((musical) => musical._id == currentMusicalId);
    setCurrMusical(musical);
    reviewsService
      .getReviews(musical.EventId)
      .then((res) => {
        setMusicalReviews(res.data);
      })
      .catch((error) => {
        debugger;
        console.log(error);
      });
  }, []);

  return (
    <>
      {user && <UpBar />}
      <Card className="musical-details-card">
        <Grid>
          <Grid container spacing={2}>
            <Grid item>
              <img id="musical-img" src={currMusical?.MainImageUrl} />
            </Grid>
            <Grid item>
              <div id="musical-title">{currMusical?.Name}</div>
              <div className="musical-text">{currMusical?.TagLine}</div>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <AccessTimeIcon className="musical-details" />
                <div className="musical-details">
                  {currMusical?.RunningTime}
                </div>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <InfoOutlinedIcon className="musical-details" />
              <div className="musical-details">{currMusical?.Description}</div>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <ConfirmationNumberOutlinedIcon className="musical-details" />
              <div className="musical-details">
                From {currMusical?.EventMinimumPrice}$
              </div>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <LocationOnOutlinedIcon className="musical-details" />
              <div className="musical-details">{currMusical?.City}</div>
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <div id="rating-chart">
          <MusicalRatingChart />
          <Reviews reviews={musicalReviews} />
        </div>
      </Card>
    </>
  );
};

export default MusicalPage;
