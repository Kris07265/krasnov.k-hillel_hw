import React from 'react';
import { useParams } from 'react-router';
import { Typography, Box, Skeleton } from '@mui/material';
import { useGetProductByIdQuery, useGetProductsByCategoryQuery } from '../../store/api/productsApi';
import ProductCard from '../ProductCard/ProductCard';
import './ProductDetailRelatedProductsSection.scss';
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const ProductDetailRelatedProductsSection = () => {
    const { id } = useParams();

    const { data: product, isLoading: isProductLoading, isError: isProductError, error: productError } = useGetProductByIdQuery(id);

    const category = product?.category;

    const { data: relatedData, isLoading: isRelatedLoading, isError: isRelatedError, error: relatedError } = useGetProductsByCategoryQuery(
        {
            category: category,
            params: { limit: 4 }
        },
        { skip: !category }
    );

    const isLoading = isProductLoading || isRelatedLoading;
    const isError = isProductError || isRelatedError;
    const error = productError || relatedError;

    if (isError) {
        return (
            <Box component="section" className="related-products">
                <ErrorMessage error={error?.message || error?.data?.message || "Error loading related products"} />
            </Box>
        );
    }

    return (
        <Box component="section" className="related-products">
                <Typography variant="h2" className="related-products__title">
                    You might also like
                </Typography>

                <Box className="related-products__grid">
                    {isLoading ? (
                        [1, 2, 3, 4].map((_, idx) => (
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
                    ) : (
                        relatedData?.products?.map((product) => (
                            <Box key={product.id} className="related-products__item">
                                <ProductCard product={product} />
                            </Box>
                        ))
                    )}
                </Box>
        </Box>
    );
};

export default ProductDetailRelatedProductsSection;