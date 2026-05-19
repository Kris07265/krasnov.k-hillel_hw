import PropTypes from 'prop-types';
import {Box, Typography, Button, Container, Grid, Skeleton} from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';
import './ProductSection.scss';
import React from "react";

const ProductSection = ({ title, products, isLoading, error, onViewAllClick }) => {

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
                    {isLoading
                        ? [1, 2, 3, 4].map((_, idx) => (
                            <Box key={idx} className="related-products__item">
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <Skeleton
                                        variant="rectangular"
                                        animation="wave"
                                        sx={{ width: '100%', pt: '100%', borderRadius: '20px' }}
                                    />
                                    <Skeleton variant="text" animation="wave" sx={{ width: '80%', height: '24px' }} />
                                    <Skeleton variant="text" animation="wave" sx={{ width: '40%', height: '20px' }} />
                                    <Skeleton variant="text" animation="wave" sx={{ width: '60%', height: '24px' }} />
                                </Box>
                            </Box>
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
    products: PropTypes.array,
    isLoading: PropTypes.bool,
    error: PropTypes.any,
    onViewAllClick: PropTypes.func
};

export default ProductSection;