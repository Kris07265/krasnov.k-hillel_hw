import PropTypes from 'prop-types';
import {Box, Typography, Button, Container, Grid, Skeleton} from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';
import './ProductSection.scss';
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const ProductSection = ({ title, products, isLoading, error, onViewAllClick }) => {

    if (error) {
        return (
                <ErrorMessage error={error?.message || error?.data?.message || "Error products loading"} />
        );
    }

    return (
        <Box component="section" className="product-section">
            <Container>
                <Typography variant="h2" className="product-section__title">
                    {title}
                </Typography>

                <Grid container spacing={{xs: 2, md: 4}} className="product-section__grid">
                    {isLoading
                        ? [1, 2, 3, 4].map((_, idx) => (
                            <Grid size={3} key={idx} className="product-section__item">
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    width="100%"
                                    height={300}
                                    sx={{
                                        borderRadius: '20px',
                                        minWidth: { md: '280px' }
                                    }}
                                />
                            </Grid>
                        ))
                        : products?.map((product) => (
                            <Grid size={3} key={product.id} className="product-section__item">
                                <ProductCard product={product} />
                            </Grid>
                        ))
                    }
                </Grid>

                <Box className="product-section__view-all-wrapper">
                    <Button
                        variant="outlined"
                        className="product-section__view-all-btn"
                        onClick={onViewAllClick}
                    >
                        View All
                    </Button>
                </Box>

                <Box className="product-section__divider" />
            </Container>
        </Box>
    );
};

ProductSection.propTypes = {
    title: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            rating: PropTypes.number,
            images: PropTypes.arrayOf(PropTypes.string),
            discountPercentage: PropTypes.number,
        })
    ),
    isLoading: PropTypes.bool,
    error: PropTypes.any,
    onViewAllClick: PropTypes.func
};

export default ProductSection;