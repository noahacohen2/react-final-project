import "./ReviewRow.css"
import ListItemText from '@mui/material/ListItemText';
import Rating from '@mui/material/Rating';
import Star from '@mui/icons-material/Star';

const ReviewRow = ({ review }) => {
    let userAvatar = require('../../Assets/olafAvatar.jpg')
    return (
        <div>
            <ListItemText
                primary={
                    <div className="item-text-primary">
                        <div className="primary-title">Seat:</div>
                        <div className="primary-text">{review.seat}</div>
                        <div className="primary-title">Rate:</div>
                        <Rating className="rating" icon={<Star fontSize=" inherit" className="star-icon" />} value={review.rate} size="small" readOnly />
                        <div className="primary-title">Musical:</div>
                        <div className="primary-text">{review.musical}</div>
                    </div>}
                secondary={review.review}
            />
        </div>
    );
};

export default ReviewRow;