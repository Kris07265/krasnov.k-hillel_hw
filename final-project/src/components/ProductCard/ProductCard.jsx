import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Rating } from '@mui/material';
import { Link } from 'react-router';
import StarIcon from '@mui/icons-material/Star';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
    const oldPrice = product.discountPercentage
        ? Math.round(product.price / (1 - product.discountPercentage / 100))
        : null;

    return (
        <Link to={`/product/${product?.id}`} className="product-card-link">
            <Box className="product-card">
                <Box className="product-card-image">
                    <img src={product?.images[0]} alt={product?.title} />
                </Box>

                <Box className="product-card-info">
                    <Typography variant="h4" className="product-title">
                        {product?.title}
                    </Typography>

                    <Box className="product-rating">
                        <Rating
                            value={product?.rating}
                            precision={0.5}
                            readOnly
                            icon={<StarIcon fontSize="inherit" />}
                            emptyIcon={<StarIcon fontSize="inherit" />}
                        />
                        <Typography variant="body2" className="rating-value">
                            {product.rating}/<span>5</span>
                        </Typography>
                    </Box>

                    <Box className="product-price-block">
                        <Typography className="current-price">
                            ${product?.price}
                        </Typography>

                        {oldPrice && (
                            <>
                                <Typography className="old-price">
                                    ${oldPrice}
                                </Typography>
                                <Box className="discount-tag">
                                    -{Math.round(product.discountPercentage)}%
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Link>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number,
        images: PropTypes.string,
        discountPercentage: PropTypes.number,
    }).isRequired,
};

export default ProductCard;