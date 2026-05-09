import React from 'react';
import { Typography, Box, Container, CircularProgress } from '@mui/material';
import { useGetProductsQuery } from '../../store/api/productsApi';
import ProductCard from '../ProductCard/ProductCard';
import './ProductDetailRelatedProductsSection.scss';

const ProductDetailRelatedProductsSection = () => {
    const { data, isLoading } = useGetProductsQuery({ limit: 4, skip: 12 });

    if (isLoading) {
        return (
            <Box className="related-products__loader">
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    return (
        <Box component="section" className="related-products">
            <Container>
                <Typography variant="h2" className="related-products__title">
                    You might also like
                </Typography>

                <Box className="related-products__grid">
                    {data?.products?.map((product) => (
                        <Box key={product.id} className="related-products__item">
                            <ProductCard product={product} />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default ProductDetailRelatedProductsSection;