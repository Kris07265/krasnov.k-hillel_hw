import { Box, Typography, Rating } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './ReviewCard.scss';

const ReviewCard = ({ review, showDate = false }) => {
    return (
        <Box className="review-card">
            <Rating
                value={5}
                readOnly
                className="review-card__rating"
            />

            <Box className="review-card__name-row">
                <Typography className="review-card__name">
                    {review.user?.fullName || "Anonymous"}
                </Typography>
                <CheckCircleIcon className="review-card__verified-icon" />
            </Box>

            <Typography className="review-card__text">
                "{review.body}"
            </Typography>

            {showDate && (
                <Typography variant="caption" className="review-card__date">
                    Posted on August 14, 2023
                </Typography>
            )}
        </Box>
    );
};

export default ReviewCard;