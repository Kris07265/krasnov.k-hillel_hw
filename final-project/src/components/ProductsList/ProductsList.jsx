import {useState, useMemo} from 'react';
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
    Skeleton,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useGetProductsByCategoryQuery, useGetProductsQuery, useSearchProductsQuery } from "../../store/api/productsApi.js";
import ProductCard from '../ProductCard/ProductCard.jsx';
import { useLocation } from 'react-router';
import './ProductsList.scss';
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const ProductsList = ({ categoryName, onFilterClick, activeFilters }) => {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q') || '';

    const pageSize = 9;

    const initialSort = location.state?.sort || 'default';

    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState(initialSort);

    const skipValue = (page - 1) * pageSize;

    const getQueryParams = () => {
        const baseParams = {
            limit: 0,
            skip: 0,
        };

        if (sortBy === 'new-arrivals') {
            return { ...baseParams, sortBy: 'id', order: 'desc' };
        }
        if (sortBy === 'top-rating') {
            return { ...baseParams, sortBy: 'rating', order: 'desc' };
        }

        return baseParams;
    };

    const queryParams = getQueryParams();

    const categoryData = useGetProductsByCategoryQuery({
        category: categoryName,
        params: queryParams
    }, { skip: !categoryName || !!searchQuery });

    const allProductsData = useGetProductsQuery(queryParams, {
        skip: !!categoryName || !!searchQuery
    });

    const searchData = useSearchProductsQuery({
        q: searchQuery,
        params: queryParams
    }, { skip: !searchQuery });

    let currentRequest;
    if (searchQuery) {
        currentRequest = searchData;
    } else if (categoryName) {
        currentRequest = categoryData;
    } else {
        currentRequest = allProductsData;
    }

    const { data, isLoading, isError, error } = currentRequest;

    const filteredProducts = useMemo(() => {
        if (!data?.products) return [];

        return data.products.filter(product => {
            const price = product.price || 0;
            const rating = product.rating || 0;
            const weight = product.weight || 0;
            const width = product.dimensions?.width || 0;
            const height = product.dimensions?.height || 0;
            const depth = product.dimensions?.depth || 0;
            const discountPercentage = product.discountPercentage || 0;

            const maxPrice = activeFilters.price[1] === 20000 ? Infinity : activeFilters.price[1];
            const maxWeight = activeFilters.weight[1] === 50 ? Infinity : activeFilters.weight[1];
            const maxWidth = activeFilters.width[1] === 100 ? Infinity : activeFilters.width[1];
            const maxHeight = activeFilters.height[1] === 100 ? Infinity : activeFilters.height[1];
            const maxDepth = activeFilters.depth[1] === 100 ? Infinity : activeFilters.depth[1];

            const matchesPrice = price >= activeFilters.price[0] && price <= maxPrice;
            const matchesRating = rating >= activeFilters.rating;
            const matchesWeight = weight >= activeFilters.weight[0] && weight <= maxWeight;
            const matchesWidth = width >= activeFilters.width[0] && width <= maxWidth;
            const matchesHeight = height >= activeFilters.height[0] && height <= maxHeight;
            const matchesDepth = depth >= activeFilters.depth[0] && depth <= maxDepth;
            const matchesOnSale = activeFilters.onSale ? discountPercentage > 0 : true;

            return matchesPrice && matchesRating && matchesWeight && matchesWidth && matchesHeight && matchesDepth && matchesOnSale;
        });
    }, [data, activeFilters]);

    const sortedProducts = useMemo(() => {
        return [...filteredProducts];
    }, [filteredProducts]);

    const totalItems = sortedProducts.length;
    const pageCount = Math.ceil(totalItems / pageSize);
    const paginatedProducts = sortedProducts.slice(skipValue, skipValue + pageSize);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        setPage(1);
    };

    if (isError) {
        return <ErrorMessage error={error?.message || error?.data?.message || "Error products loading"} />;
    }

    return (
        <Box className="products-list">
            <Box className="products-list__header">
                <Typography variant="h2" className="products-list__title">
                    {searchQuery ? `Search Results: "${searchQuery}"` : (categoryName || "All Products")}
                </Typography>

                <Box className="products-list__controls">
                    <Typography variant="body1" className="products-list__count">
                        {isLoading ? (
                            <Skeleton variant="text" animation="wave" sx={{ width: '140px', height: '22px', display: 'inline-block' }} />
                        ) : (
                            `Showing ${totalItems > 0 ? skipValue + 1 : 0}-${Math.min(skipValue + pageSize, totalItems)} of ${totalItems} Products`
                        )}
                    </Typography>

                    <Box className="products-list__sort">
                        <Typography variant="body1" className="products-list__sort-label">
                            Sort by:
                        </Typography>
                        <FormControl variant="standard" className="products-list__form-control">
                            <Select
                                variant="standard"
                                value={sortBy}
                                onChange={handleSortChange}
                                disableUnderline
                                className="products-list__sort-select"
                            >
                                <MenuItem value="default">Default</MenuItem>
                                <MenuItem value="new-arrivals">NEW ARRIVALS</MenuItem>
                                <MenuItem value="top-rating">TOP RATING</MenuItem>
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
                {isLoading ? (
                    [...Array(pageSize)].map((_, i) => (
                        <Grid size={{xs: 6, md: 4}} key={i} className="products-list__grid-item">
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                sx={{ width: '100%', height: '360px', borderRadius: '20px' }}
                            />
                        </Grid>
                    ))
                ) : (
                    paginatedProducts.map((product) => (
                        <Grid size={{xs: 6, md: 4}} key={product.id} className="products-list__grid-item">
                            <ProductCard product={product} />
                        </Grid>
                    ))
                )}
            </Grid>

            {!isLoading && totalItems === 0 && (
                <Typography sx={{ textAlign: 'center', py: 5 }}>No products found matching filters.</Typography>
            )}

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
    onFilterClick: PropTypes.func,
    activeFilters: PropTypes.shape({
        price: PropTypes.arrayOf(PropTypes.number),
        rating: PropTypes.number,
        weight: PropTypes.arrayOf(PropTypes.number),
        width: PropTypes.arrayOf(PropTypes.number),
        height: PropTypes.arrayOf(PropTypes.number),
        depth: PropTypes.arrayOf(PropTypes.number),
        onSale: PropTypes.bool
    })
};

export default ProductsList;