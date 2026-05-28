import { useRef } from 'react';
import { Box, Typography, Container, IconButton, Skeleton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGetProductsQuery } from "../../store/api/productsApi.js";
import ReviewCard from '../ReviewCard/ReviewCard.jsx';
import './ReviewsSection.scss';
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const ReviewsSection = () => {
    const { data, isLoading, isError, error } = useGetProductsQuery({
        limit: 10,
        sortBy: 'rating',
        order: 'desc'
    });

    const products = data?.products || [];
    const reviews = products.flatMap(product => product.reviews || []);

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = current.offsetWidth / 2;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    if (isError) return <ErrorMessage error={error?.message || error?.data?.message || "Error reviews loading"} />;

    return (
        <Box component="section" className="customers">
            <Container>
                <Box className="customers__header">
                    <Typography variant="h2" className="customers__title">
                        OUR HAPPY CUSTOMERS
                    </Typography>

                    <Box className="customers__navigation">
                        <IconButton onClick={() => scroll('left')} className="customers__arrow">
                            <ArrowBackIcon />
                        </IconButton>
                        <IconButton onClick={() => scroll('right')} className="customers__arrow">
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Box className="customers__slider" ref={scrollRef}>
                    {isLoading ? (
                        [...Array(4)].map((_, index) => (
                            <Box
                                key={index}
                                className="customers__card-wrapper"
                                sx={{ minWidth: { xs: '310px', md: '400px' } }}
                            >
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    sx={{ width: '100%', height: '240px', borderRadius: '20px' }}
                                />
                            </Box>
                        ))
                    ) : (
                        reviews.map((review, index) => (
                            <Box
                                key={`${review.id || index}`}
                                className="customers__card-wrapper"
                                sx={{ minWidth: { xs: '310px', md: '400px' } }}
                            >
                                <ReviewCard review={review} />
                            </Box>
                        ))
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default ReviewsSection;