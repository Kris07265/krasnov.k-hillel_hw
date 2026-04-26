import React from 'react';
import { Box, Container, CircularProgress } from '@mui/material';
import {useGetCategoriesQuery} from "../../store/api/productsApi.js";
import './AppBrandsBar.scss';

const AppBrandsBar = () => {
    // Получаем данные из API
    const { data: categories, isLoading, error } = useGetCategoriesQuery();

    // Если данные загружаются, можно показать спиннер или просто пустую полосу
    if (isLoading) return <Box className="brands-bar-loading"><CircularProgress size={20} /></Box>;

    // Если ошибка, можно скрыть секцию или вывести дефолтные значения
    if (error || !categories) return null;

    // Берем первые 5 категорий для отображения в баре
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