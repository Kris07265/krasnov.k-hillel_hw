import { useRef } from 'react';
import { Box, Typography, Container, CircularProgress, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGetProductsQuery } from "../../store/api/productsApi.js";
import ReviewCard from '../ReviewCard/ReviewCard.jsx';
import './ReviewsSection.scss';

const ReviewsSection = () => {
    const { data, isLoading, isError } = useGetProductsQuery({
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
            const scrollAmount = current.offsetWidth / 3;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    if (isError) return null;

    if (isLoading) {
        return (
            <Box className="customers__loader">
                <CircularProgress color="inherit" />
            </Box>
        );
    }

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
                    {reviews.map((review, index) => (
                        <Box
                            key={`${review.id || index}`}
                            className="customers__card-wrapper"
                            sx={{ minWidth: { xs: '310px', md: '400px' } }}
                        >
                            <ReviewCard review={review} />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default ReviewsSection;