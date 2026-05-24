import { Box, Typography, Skeleton } from '@mui/material';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { useGetProductsByCategoryQuery } from "../../store/api/productsApi.js";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import './BrowseByStyleItem.scss';

const BrowseByStyleItem = ({ categoryName, index }) => {
    const { data: productsData, isLoading, isError, error } = useGetProductsByCategoryQuery({
        category: categoryName,
        params: { limit: 1 }
    });

    if (isError) {
        return (
            <ErrorMessage error={error?.message || error?.data?.message || "Error products loading"} />
        );
    }

    const productImage = productsData?.products?.[0]?.images?.[0];

    return (
        <Box
            component={Link}
            to={`/category/${categoryName}`}
            onClick={() => {window.scrollTo(0, 0)}}
            className={`browse-style-item browse-style-item--type-${index}`}
            style={{
                backgroundImage: !isLoading && productImage ? `url(${productImage})` : 'none'
            }}
        >
            <Typography className="browse-style-item__label">
                {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
            </Typography>

            {isLoading && (
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    className="browse-style-item__skeleton"
                />
            )}
        </Box>
    );
};

BrowseByStyleItem.propTypes = {
    categoryName: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};

export default BrowseByStyleItem;