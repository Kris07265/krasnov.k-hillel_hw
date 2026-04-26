import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, Container, CircularProgress } from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';
import './ProductSection.scss';

const ProductSection = ({ title, products, isLoading, error }) => {
    return (
        <Box component="section" className="product-section">
            <Container maxWidth="xl">
                <Typography variant="h2" className="section-title">
                    {title}
                </Typography>

                {isLoading ? (
                    <Box className="section-loader">
                        <CircularProgress color="inherit" />
                    </Box>
                ) : error ? (
                    <Typography color="error" textAlign="center">
                        Error loading products.
                    </Typography>
                ) : (
                    <>
                        <Box className="products-grid">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </Box>

                        <Box className="view-all-wrapper">
                            <Button variant="outlined" className="view-all-btn">
                                View All
                            </Button>
                        </Box>
                    </>
                )}

                <Box className="section-divider" />
            </Container>
        </Box>
    );
};

ProductSection.propTypes = {
    title: PropTypes.string.isRequired,
    products: PropTypes.array,
    isLoading: PropTypes.bool,
    error: PropTypes.any,
};

export default ProductSection;