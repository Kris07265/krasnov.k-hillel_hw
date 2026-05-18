import PropTypes from 'prop-types';
import {Box, Typography, Button, Container, CircularProgress, Grid} from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';
import './ProductSection.scss';

const ProductSection = ({ title, products, isLoading, error, onViewAllClick }) => {

    if (isLoading) {
        return (
            <Box className="product-section__loader">
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="product-section__error-container">
                <Typography color="error" textAlign="center" className="product-section__error">
                    Error loading products. Please try again later.
                </Typography>
            </Box>
        );
    }

    return (
        <Box component="section" className="product-section">
            <Container>
                <Typography variant="h2" className="product-section__title">
                    {title}
                </Typography>

                <Grid container spacing={{xs: 2, md: 4}} className="product-section__grid">
                    {products?.map((product) => (
                        <Grid size={3} key={product.id} className="product-section__item">
                            <ProductCard product={product} />
                        </Grid>
                    ))}
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
    products: PropTypes.array,
    isLoading: PropTypes.bool,
    error: PropTypes.any,
    onViewAllClick: PropTypes.func
};

export default ProductSection;