import { Box, Typography, Rating } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './ReviewCard.scss';

const ReviewCard = ({ review, showDate = false }) => {
    const reviewerName = review.reviewerName || review.user?.fullName || "Anonymous";
    const commentText = review.comment || review.body || "";
    const ratingValue = review.rating !== undefined ? review.rating : 5;

    const formatDate = (dateString) => {
        if (!dateString) return "August 14, 2023";
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

            {showDate && (
                <Typography variant="caption" className="review-card__date">
                Posted on {formatDate(review.date)}
                </Typography>
                )}
</Box>
);
};

export default ReviewCard;