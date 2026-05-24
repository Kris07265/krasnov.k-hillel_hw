import { Box, Typography, Rating } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './ReviewCard.scss';
import PropTypes from "prop-types";

const ReviewCard = ({ review }) => {
    const reviewerName = review.reviewerName || "Anonymous";
    const commentText = review.comment || "";
    const ratingValue = review.rating !== undefined ? review.rating : 5;

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Box className="review-card">
            <Rating
                value={ratingValue}
                readOnly
                precision={0.5}
                className="review-card__rating"
            />

            <Box className="review-card__name-row">
                <Typography className="review-card__name">
                    {reviewerName}
                </Typography>
                <CheckCircleIcon className="review-card__verified-icon" />
            </Box>

            <Typography className="review-card__text">
                "{commentText}"
            </Typography>

            <Typography variant="caption" className="review-card__date">
                Posted on {formatDate(review.date)}
            </Typography>
        </Box>
    );
};

ReviewCard.propTypes = {
    review: PropTypes.shape({
        reviewerName: PropTypes.string,
        comment: PropTypes.string,
        rating: PropTypes.number,
        date: PropTypes.string
    }).isRequired
};

export default ReviewCard;