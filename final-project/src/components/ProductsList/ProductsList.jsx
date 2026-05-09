import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Typography,
    Grid,
    Pagination,
    PaginationItem,
    MenuItem,
    Select,
    FormControl,
    IconButton,
    CircularProgress,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGetProductsByCategoryQuery } from "../../store/api/productsApi.js";
import ProductCard from '../ProductCard/ProductCard.jsx';
import './ProductsList.scss';

const ProductsList = ({ categoryName = "Casual", onFilterClick }) => {
    const pageSize = 9;
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('most-popular');

    const skip = (page - 1) * pageSize;

    const { data, isLoading, isError } = useGetProductsByCategoryQuery({
        category: categoryName,
        params: {
            limit: pageSize,
            skip: skip,
        }
    });

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    if (isLoading) {
        return (
            <Box className="products-list products-list--loading" sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    if (isError) {
        return <Typography className="products-list__error">Error</Typography>;
    }

    const products = data?.products || [];
    const totalItems = data?.total || 0;
    const pageCount = Math.ceil(totalItems / pageSize);

    return (
        <Box className="products-list">
            <Box className="products-list__header">
                <Typography variant="h2" className="products-list__title">
                    {categoryName}
                </Typography>

                <Box className="products-list__controls">
                    <Typography variant="body1" className="products-list__count">
                        Showing {skip + 1}-{Math.min(skip + pageSize, totalItems)} of {totalItems} Products
                    </Typography>

                    <Box className="products-list__sort">
                        <Typography variant="body1" className="products-list__sort-label">
                            Sort by:
                        </Typography>
                        <FormControl variant="standard" className="products-list__form-control">
                            <Select
                                value={sortBy}
                                onChange={handleSortChange}
                                disableUnderline
                                className="products-list__sort-select"
                            >
                                <MenuItem value="most-popular">Most Popular</MenuItem>
                                <MenuItem value="low-price">Price: Low to High</MenuItem>
                                <MenuItem value="high-price">Price: High to Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <IconButton
                        className="products-list__filter-btn"
                        onClick={onFilterClick}
                    >
                        <TuneIcon />
                    </IconButton>
                </Box>
            </Box>

            <Grid container spacing={{ xs: 2, md: 3 }} className="products-list__grid">
                {products?.map((product) => (
                    <Grid size={{xs: 6, md: 4}} key={product.id} className="products-list__grid-item">
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>

            <Box className="products-list__pagination-container">
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{
                                previous: () => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <ArrowBackIcon fontSize="small" /> Previous
                                    </Box>
                                ),
                                next: () => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        Next <ArrowForwardIcon fontSize="small" />
                                    </Box>
                                )
                            }}
                            {...item}
                        />
                    )}
                    className="products-list__pagination"
                />
            </Box>
        </Box>
    );
};

ProductsList.propTypes = {
    categoryName: PropTypes.string,
    onFilterClick: PropTypes.func
};

export default ProductsList;