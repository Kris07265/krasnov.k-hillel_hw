import React from 'react';
import { Typography, Box, Container, CircularProgress } from '@mui/material';
import { useGetProductsQuery } from '../../store/api/productsApi';
import ProductCard from '../ProductCard/ProductCard';
import './RelatedProducts.scss';

const RelatedProducts = () => {
    const { data, isLoading } = useGetProductsQuery({ limit: 4, skip: 12 });

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    return (
        <Box component="section" className="related-products">
            <Container maxWidth="xl">
                <Typography variant="h2" className="related-title">
                    You might also like
                </Typography>

                <Box className="products-scroll-container">
                    {data?.products?.map((product) => (
                        <Box key={product.id} className="scroll-item">
                            <ProductCard product={product} />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default RelatedProducts;