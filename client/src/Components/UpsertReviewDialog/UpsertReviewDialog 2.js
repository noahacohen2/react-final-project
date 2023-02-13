import * as React from "react";
import Dialog from "@mui/material/Dialog";
import "./UpsertReviewDialog.css";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Star from "@mui/icons-material/Star";
import { useState, useContext, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import reviewsService from "../../Services/reviews";
import AppContext from "../../Context/Context";

const UpsertReviewDialog = ({
  mood,
  isOpen,
  closeDialog,
  musicalName,
  musicalEventId,
  seat = "",
  content = "",
  starsRate = 0,
  reviewId,
}) => {
  const [user, setUser] = useContext(AppContext).user;
  const seatRef = useRef();
  const contentRef = useRef();
  const [starsValue, setStarsValue] = useState(starsRate);
  const [getWebSocket] = useContext(AppContext).WebSocket;

  useEffect(() => {
    if (mood == "update") {
      setStarsValue(starsRate);
    }
  }, [isOpen]);

  const addReview = () => {
    reviewsService
      .addReview(
        musicalName,
        seatRef.current.value,
        contentRef.current.value,
        starsValue,
        user.localId,
        musicalEventId
      )
      .then((res) => {
        getWebSocket().send(musicalEventId.toString());
        setStarsValue(0);
        closeDialog();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateReview = () => {
    reviewsService
      .updateReview({
        _id: reviewId,
        Stars: starsValue,
        Content: contentRef.current.value || content,
        EventId: musicalEventId,
        Seat: seatRef.current.value,
        User_id: user.localId,
      })
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
      <div id="dialog-title">{mood == "add" ? "New" : "Update"} Review</div>
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
            className="review-text-field"
            size="small"
            inputRef={seatRef}
            defaultValue={seat}
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
            className="review-text-field"
            size="small"
            inputRef={contentRef}
            defaultValue={content}
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
        <Button
          id="save-review-btn"
          onClick={mood == "add" ? addReview : updateReview}
        >
          {mood == "add" ? "save" : "update"}
        </Button>
      </Grid>
    </Dialog>
  );
};

export default UpsertReviewDialog;
