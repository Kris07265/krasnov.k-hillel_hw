import React from 'react';
import { Box, Container, CircularProgress } from '@mui/material';
import {useGetCategoriesQuery} from "../../store/api/productsApi.js";
import './AppBrandsBar.scss';

const AppBrandsBar = () => {
    const { data: categories, isLoading, error } = useGetCategoriesQuery();

    if (isLoading) return <Box className="brands-bar-loading"><CircularProgress size={20} /></Box>;

    if (error || !categories) return null;

    const displayedBrands = categories.slice(0, 4);

    return (
        <Box component="section" className="brands-bar">
            <Container maxWidth="xl" className="brands-container">
                {displayedBrands.map((category) => (
                    <span key={category} className="brand-logo">
                        {category.replace('-', ' ').toUpperCase()}
                    </span>
                ))}
            </Container>
        </Box>
    );
};

export default AppBrandsBar;