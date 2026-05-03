import React from 'react';
import { Box, Typography, Button, Stack, IconButton, CircularProgress, Container } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ReviewCard from '../ReviewCard/ReviewCard.jsx';
import { useGetReviewsQuery } from "../../store/api/reviewsApi.js";
import './ProductReviewsSection.scss';

const ProductReviewsSection = () => {
    const { data, isLoading, isError } = useGetReviewsQuery(6);
    const reviews = data?.comments || [];

    if (isLoading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color="inherit" />
        </Box>
    );

    if (isError) return null;

    return (
        <Container maxWidth="xl">
            <Box component="section" className="product-reviews-section">
                <Box className="tabs-navigation">
                    <Typography className="tab-item">Product Details</Typography>
                    <Typography className="tab-item active">Rating & Reviews</Typography>
                    <Typography className="tab-item">FAQs</Typography>
                </Box>

                <Box className="reviews-header">
                    <Typography variant="h4" className="section-title">
                        All Reviews <span className="reviews-count">(451)</span>
                    </Typography>

                    <Stack direction="row" spacing={{ xs: 1, sm: 1.5 }} className="header-actions">
                        <IconButton className="icon-circle-btn"><TuneIcon /></IconButton>
                        <Button variant="contained" className="select-btn desktop-only" endIcon={<KeyboardArrowDownIcon />}>
                            Latest
                        </Button>
                        <Button variant="contained" className="black-btn">
                            Write a Review
                        </Button>
                    </Stack>
                </Box>

                <Box className="reviews-grid">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} showDate={true} />
                    ))}
                </Box>

                <Box className="load-more-container">
                    <Button variant="outlined" className="load-more">
                        Load More Reviews
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ProductReviewsSection;