import { Box, Typography, Button, Stack, IconButton, CircularProgress, Container } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ReviewCard from '../ReviewCard/ReviewCard.jsx';
import { useGetReviewsQuery } from "../../store/api/reviewsApi.js";
import './ProductDetailReviewsSection.scss';

const ProductDetailReviewsSection = () => {
    const { data, isLoading, isError } = useGetReviewsQuery(6);
    const reviews = data?.comments || [];

    if (isLoading) return (
        <Box className="product-reviews__loader">
            <CircularProgress color="inherit" />
        </Box>
    );

    if (isError) return null;

    return (
        <Container maxWidth="xl">
            <Box component="section" className="product-reviews">
                <Box className="product-reviews__tabs">
                    <Typography className="product-reviews__tab">Product Details</Typography>
                    <Typography className="product-reviews__tab product-reviews__tab--active">Rating & Reviews</Typography>
                    <Typography className="product-reviews__tab">FAQs</Typography>
                </Box>

                <Box className="product-reviews__header">
                    <Typography variant="h4" className="product-reviews__title">
                        All Reviews <span className="product-reviews__count">(451)</span>
                    </Typography>

                    <Stack direction="row" spacing={{ xs: 1, sm: 1.5 }} className="product-reviews__actions">
                        <IconButton className="product-reviews__icon-btn"><TuneIcon /></IconButton>
                        <Button
                            variant="contained"
                            className="product-reviews__select-btn product-reviews__select-btn--desktop-only"
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Latest
                        </Button>
                        <Button variant="contained" className="product-reviews__write-btn">
                            Write a Review
                        </Button>
                    </Stack>
                </Box>

                <Box className="product-reviews__grid">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} showDate={true} />
                    ))}
                </Box>

                <Box className="product-reviews__load-more-container">
                    <Button variant="outlined" className="product-reviews__load-more-btn">
                        Load More Reviews
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ProductDetailReviewsSection;