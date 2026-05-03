import React from 'react';
import { Box, Typography, Rating } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './ReviewCard.scss';

const ReviewCard = ({ review, showDate = false }) => {
    return (
        <Box className="review-card">
            <Rating
                value={5}
                readOnly
                className="review-rating"
            />
            <Box className="review-name-row">
                <Typography className="review-name">
                    {review.user?.fullName || "Anonymous"}
                </Typography>
                <CheckCircleIcon className="verified-icon" />
            </Box>
            <Typography className="review-text">
                "{review.body}"
            </Typography>

            {showDate && (
                <Typography variant="caption" className="review-date">
                    Posted on August 14, 2023
                </Typography>
            )}
        </Box>
    );
};

export default ReviewCard;