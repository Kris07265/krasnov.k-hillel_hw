import React from 'react';
import { useParams } from 'react-router';
import { Typography, Box, Container, Skeleton } from '@mui/material';
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

    const isLoading = isProductLoading || isRelatedLoading;

    return (
        <Box component="section" className="related-products">
            <Container>
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
            </Container>
        </Box>
    );
};

export default ProductDetailRelatedProductsSection;