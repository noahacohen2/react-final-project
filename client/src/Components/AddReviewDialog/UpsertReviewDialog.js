import * as React from "react";
import Dialog from "@mui/material/Dialog";
import "./UpsertReviewDialog.css";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Star from "@mui/icons-material/Star";
import { useState, useContext, useRef } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import reviewsService from "../../Services/reviews";
import AppContext from "../../Context/Context";

const UpsertReviewDialog = ({
  isOpen,
  closeDialog,
  musicalName,
  musicalEventId,
}) => {
  const [user, setUser] = useContext(AppContext).user;
  const seatRef = useRef();
  const contentRef = useRef();
  const [starsValue, setStarsValue] = useState(0);

  const upsertReview = () => {
    reviewsService
      .upsertReview(
        musicalName,
        seatRef.current.value,
        contentRef.current.value,
        starsValue,
        user.localId,
        musicalEventId
      )
      .then((res) => {
        closeDialog();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog
      onClose={() => {
        setStarsValue(0);
        closeDialog();
      }}
      open={isOpen}
      fullWidth
    >
      <div id="dialog-title">New Review</div>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <div className="musical-field">Musical:</div>
          <TextField
            className="review-text-field disabled"
            size="small"
            disabled={true}
            label={musicalName}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <div className="musical-field">Seat:</div>
          <TextField
            label="Seat"
            className="review-text-field"
            size="small"
            inputRef={seatRef}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <div className="musical-field">Content:</div>
          <TextField
            label="Content"
            className="review-text-field"
            size="small"
            inputRef={contentRef}
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <div className="musical-field">Rate:</div>
          <Rating
            className="rating-stars"
            icon={<Star fontSize=" inherit" className="star-icon" />}
            value={starsValue}
            onChange={(event, newStarsValue) => {
              setStarsValue(newStarsValue);
            }}
            size="small"
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button id="save-review-btn" onClick={upsertReview}>
          save
        </Button>
      </Grid>
    </Dialog>
  );
};

export default UpsertReviewDialog;
