import "./Reviews.css"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ReviewRow from "./ReviewRow";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import reviewsService from "../../Services/reviews.js";


const Reviews = ({ reviews, setReviews }) => {
    let userAvatar = require('../../Assets/olafAvatar.jpg')

    const handleDeleteReview = async (review) => {
        let isOk = await reviewsService.deleteReview(review);

        if (isOk) {
            setReviews(reviews.filter(rev => rev._id != review._id))
            console.log("rev", reviews)
        }
    }

    return (
        <div className="reviews">
            <div className="reviews-Title">Reviews</div>
            <Divider variant="middle" />
            <List className="reviews-List">
                {reviews.map((review, index) => {
                    return (
                        <>
                            <ListItem key={index}
                                secondaryAction={
                                    <div className="secondary-action">
                                        <IconButton edge="end" aria-label="update">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteReview(review)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                }>
                                <ListItemAvatar>
                                    <Avatar src={userAvatar}></Avatar>
                                </ListItemAvatar>
                                <ReviewRow review={review}></ReviewRow>
                            </ListItem>
                            <Divider variant="inset" />
                        </>
                    )
                })}
            </List>
        </div>
    );
};

export default Reviews;