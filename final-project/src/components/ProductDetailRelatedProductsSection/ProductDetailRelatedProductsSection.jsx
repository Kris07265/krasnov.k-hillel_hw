import React from 'react';
import { useParams } from 'react-router';
import { Typography, Box, Container, CircularProgress } from '@mui/material';
import { useGetProductByIdQuery, useGetProductsByCategoryQuery } from '../../store/api/productsApi';
import ProductCard from '../ProductCard/ProductCard';
import './ProductDetailRelatedProductsSection.scss';

const ProductDetailRelatedProductsSection = () => {
    const { id } = useParams();

    const { data: product, isLoading: isProductLoading } = useGetProductByIdQuery(id);

    const category = product?.category;

    const { data: relatedData, isLoading: isRelatedLoading } = useGetProductsByCategoryQuery(
        {
            category: category,
            params: { limit: 4 }
        },
        { skip: !category }
    );

    if (isProductLoading || isRelatedLoading) {
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
                    {relatedData?.products?.map((product) => (
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