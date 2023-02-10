import "./Reviews.css";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import EditIcon from '@mui/icons-material/Edit';
import ListItem from "@mui/material/ListItem";
import ReviewRow from "./ReviewRow";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from "react";
import FilterDialog from "../../Components/FilterDialog/FilterDialog.js";
import reviewsService from "../../Services/reviews.js";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";


const Reviews = ({ reviews, setReviews, showActions }) => {
  const [isFiltePopupOpen, setIsFiltePopupOpen] = useState(false);
  const [filterArray, setFilterArray] = useState([]);
  const [currFilter, setCurrFilter] = useState([]);

  let userAvatar = require('../../Assets/olafAvatar.jpg');

  useEffect(() => {
    const setFilterOptionalValues = (filterKey, tempFilter) => {
      let currFilter = tempFilter.find(fil => fil.key == filterKey);
      currFilter.optionalValues = [...new Set(reviews.map((review) => review[filterKey]))];
    };

    let tempFilter = [
      {
        key: 'Seat', title: 'Seat', optionalValues: []
      },
      {
        key: 'Stars', title: 'Stars', optionalValues: []
      },
      {
        key: 'Musical', title: 'Musical', optionalValues: []
      }
    ]

    setFilterOptionalValues('Seat', tempFilter);
    setFilterOptionalValues('Stars', tempFilter);
    setFilterOptionalValues('Musical', tempFilter);

    setFilterArray(tempFilter)
  }, [reviews])

  const openFilterPopup = () => {
    setIsFiltePopupOpen(true);
  };

  const handleDeleteReview = async (review) => {
    let isOk = await reviewsService.deleteReview(review);

    if (isOk) {
      setReviews(reviews.filter(rev => rev._id != review._id))
    }
  };

  const checkFilterParam = (review) => {
    let isOk = true;
    filterArray.forEach(filter => {
      let currentFilterValues;
      if (currFilter.find(curr => curr.key == filter.key)) {
        currentFilterValues = currFilter.find(curr => curr.key == filter.key).selectedValues;

        isOk = isOk && (currentFilterValues.length == 0 || currentFilterValues.some(value => value === review[filter.key]));
      }
    });

    return isOk;
  }

  const filteredReviews = () => {
    return reviews.filter(review => {
      return ((currFilter.length != 0 && checkFilterParam(review)) ||
        currFilter.length == 0)
    })
  }

  return (
    <div className="reviews">

      {showActions && (<FilterDialog
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
        <FilterAltOutlinedIcon
          className="review-filter-icon"
          onClick={openFilterPopup}
        />
      </div>
      <Divider variant="middle" />
      <List className="reviews-List">
        {filteredReviews()?.map((review, index) => {
          return (
            <div key={index}>
              <ListItem
                secondaryAction={
                  <>
                    {
                      showActions && (
                        <div className="secondary-action">
                          <IconButton edge="end" aria-label="update">
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
                      )
                    }
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar src={userAvatar}></Avatar>
                </ListItemAvatar>
                <ReviewRow review={review}></ReviewRow>
              </ListItem >
              <Divider variant="inset" />
            </div>
          )
        })}
      </List >
    </div >
  );
};

export default Reviews;
