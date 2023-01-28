import "./Reviews.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ReviewRow from "./ReviewRow";

const Reviews = ({ reviews }) => {
  let userAvatar = require("../../Assets/olafAvatar.jpg");
  return (
    <div>
      <div className="reviews-Title">Reviews</div>
      <Divider variant="middle" />
      <List className="reviews-List">
        {reviews.map((review, index) => {
          return (
            <>
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar src={userAvatar}></Avatar>
                </ListItemAvatar>
                <ReviewRow review={review}></ReviewRow>
              </ListItem>
              <Divider variant="inset" />
            </>
          );
        })}
      </List>
    </div>
  );
};

export default Reviews;
