import React from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { useGetCategoriesQuery, useGetProductsQuery } from "../../store/api/productsApi.js";
import './BrowseByStyle.scss';

const BrowseByStyle = () => {
    const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError } = useGetCategoriesQuery();
    const { data: productsData, isLoading: isProductsLoading, isError: isProductsError } = useGetProductsQuery({ limit: 4, skip: 8 });

    const styleCategories = categories ? categories.slice(0, 4) : [];
    const products = productsData?.products || [];

    if (isCategoriesError || isProductsError) return null;

    const isLoading = isCategoriesLoading || isProductsLoading;

    return (
        <Container maxWidth="xl" className="browse-outer-container">
            <Box className="browse-card-wrapper">
                <Typography variant="h2" className="browse-title">
                    BROWSE BY DRESS STYLE
                </Typography>

                {isLoading ? (
                    <Box className="browse-loader">
                        <CircularProgress color="inherit" />
                    </Box>
                ) : (
                    <Box className="browse-grid">
                        {styleCategories.map((cat, index) => {
                            const categoryName = typeof cat === 'string' ? cat : cat.name;
                            const productImage = products[index]?.images[0];

                            return (
                                <Box
                                    key={index}
                                    className={`browse-item item-type-${index}`}
                                >
                                    <Typography className="item-label">
                                        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                                    </Typography>

                                    {productImage && (
                                        <img
                                            src={productImage}
                                            alt={categoryName}
                                            className="item-image"
                                        />
                                    )}
                                </Box>
                            );
                        })}
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default BrowseByStyle;