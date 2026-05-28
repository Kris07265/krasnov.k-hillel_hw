import { useEffect } from 'react';
import { useParams } from 'react-router';
import {Typography, Box, Skeleton, Grid} from '@mui/material';
import { useGetProductByIdQuery, useGetProductsByCategoryQuery } from '../../store/api/productsApi';
import ProductCard from '../ProductCard/ProductCard';
import './ProductDetailRelatedProductsSection.scss';
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const ProductDetailRelatedProductsSection = () => {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

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

            <Grid container spacing={{xs: 2, md: 4}} className="related-products__grid">
                {isLoading ? (
                    [1, 2, 3, 4].map((_, idx) => (
                        <Grid size={3} key={idx} className="related-products__item">
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
                ) : (
                    relatedData?.products?.map((product) => (
                        <Grid size={3} key={product.id} className="related-products__item">
                            <ProductCard product={product} />
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default ProductDetailRelatedProductsSection;