import React, { useRef } from 'react';
import { Box, Typography, Container, CircularProgress, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGetReviewsQuery } from "../../store/api/reviewsApi.js";
import ReviewCard from '../ReviewCard/ReviewCard.jsx';
import './HappyCustomers.scss';

const HappyCustomers = () => {
    const { data, isLoading, isError } = useGetReviewsQuery(10);
    const reviews = data?.comments || [];

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = current.offsetWidth / 3;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    if (isError) return null;

    return (
        <Box component="section" className="customers-section">
            <Container maxWidth="xl">
                <Box className="customers-header">
                    <Typography variant="h2" className="customers-title">
                        OUR HAPPY CUSTOMERS
                    </Typography>

                    <Box className="navigation-arrows">
                        <IconButton onClick={() => scroll('left')} className="arrow-btn">
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton onClick={() => scroll('right')} className="arrow-btn">
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </Box>

                {isLoading ? (
                    <Box className="customers-loader">
                        <CircularProgress color="inherit" />
                    </Box>
                ) : (
                    <Box className="customers-wrapper" ref={scrollRef}>
                        {reviews.map((review) => (
                            <Box
                                key={review.id}
                                className="card-container"
                                sx={{ minWidth: { xs: '310px', md: '400px' } }}
                            >
                                <ReviewCard review={review} />
                            </Box>
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default HappyCustomers;