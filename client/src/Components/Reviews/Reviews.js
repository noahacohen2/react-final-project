import "./Reviews.css";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import ListItem from "@mui/material/ListItem";
import ReviewRow from "./ReviewRow";
import AppContext from "../../Context/Context";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect, useContext } from "react";
import FilterDialog from "../../Components/FilterDialog/FilterDialog.js";
import reviewsService from "../../Services/reviews.js";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import UpsertReviewDialog from "../../Components/UpsertReviewDialog/UpsertReviewDialog";
import useFilter from "../../Hooks/filterHook"

const Reviews = ({
  reviews,
  setReviews,
  showActions,
  noDataText,
  cardSize,
  refreshReviews
}) => {
  const [isFiltePopupOpen, setIsFiltePopupOpen] = useState(false);
  const [filterArray, setFilterArray] = useState([]);
  const [currFilter, setCurrFilter] = useState([]);
  const [updatedReview, setUpdatedReview] = useState({});
  const [isUpsertReviewDialogOpen, setIsUpsertReviewDialogOpen] =
    useState(false);
  const [isLoading, setLoading] = useContext(AppContext).isLoading;
  const { buildFilterArray, checkFilterParam } = useFilter("reviews");


  let userAvatar = require("../../Assets/olafAvatar.jpg");
  let noDataImg = require("../../Assets/noReviews.png");

  useEffect(() => {
    setFilterArray(buildFilterArray(reviews));
  }, [reviews]);

  const openFilterPopup = () => {
    setIsFiltePopupOpen(true);
  };

  const handleDeleteReview = async (review) => {
    setLoading(true);
    let isOk = await reviewsService.deleteReview(review);

    if (isOk) {
      setReviews(reviews.filter((rev) => rev._id != review._id));
    }

    setLoading(false)
  };

  const handleUpdateReview = async (review) => {
    await setUpdatedReview(review);
    setIsUpsertReviewDialogOpen(true);
  };

  const filteredReviews = () => {
    return reviews?.filter((review) => {
      return (
        (currFilter.length != 0 && checkFilterParam(review, currFilter)) ||
        currFilter.length == 0
      );
    });
  };

  return (
    <>
      <div className="reviews">
        {showActions && (
          <FilterDialog
            isOpen={isFiltePopupOpen}
            closeDialog={() => {
              setIsFiltePopupOpen(false);
            }}
            filterArray={filterArray}
            saveFilterOptions={setCurrFilter}
          />
        )}
        <div className="review-title-filter">
          <div className="reviews-Title">Reviews</div>
          {showActions && (
            <FilterAltOutlinedIcon
              className="review-filter-icon"
              onClick={openFilterPopup}
            />
          )}
        </div>
        <Divider variant="middle" />
        {filteredReviews()?.length == 0 && (
          <>
            <div className="center-items">
              <img className="no-reviews-img" src={noDataImg} />
            </div>
            {noDataText?.split("&")?.map((text, index) => {
              return (
                <div key={index}>
                  <div className="reviews-no-data-text">{text}</div>
                </div>
              );
            })}
          </>
        )}
        {filteredReviews()?.length > 0 && (
          <List className="reviews-List" style={{ maxHeight: cardSize }}>
            {filteredReviews()?.map((review, index) => {
              return (
                <div key={index}>
                  <ListItem
                    secondaryAction={
                      <>
                        {showActions && (
                          <div className="secondary-action">
                            <IconButton
                              edge="end"
                              aria-label="update"
                              onClick={() => handleUpdateReview(review)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDeleteReview(review)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        )}
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar src={userAvatar}></Avatar>
                    </ListItemAvatar>
                    <ReviewRow review={review}></ReviewRow>
                  </ListItem>
                  <Divider variant="inset" />
                </div>
              );
            })}
          </List>
        )}
      </div>
      <UpsertReviewDialog
        mood="update"
        musicalName={updatedReview?.Musical}
        musicalEventId={updatedReview?.EventId}
        isOpen={isUpsertReviewDialogOpen}
        seat={updatedReview?.Seat}
        content={updatedReview?.Content}
        starsRate={updatedReview?.Stars}
        reviewId={updatedReview?._id}
        closeDialog={(isUpdated) => {
          if (isUpdated) {
            refreshReviews();
          }
          setIsUpsertReviewDialogOpen(false);
        }}
      />
    </>
  );
};

export default Reviews;
