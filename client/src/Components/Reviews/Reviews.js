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
        {reviews?.map((review, index) => {
          return (
            <div key={index}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={userAvatar} />
                </ListItemAvatar>
                <ReviewRow review={review} />
              </ListItem>
              <Divider variant="inset" />
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default Reviews;
