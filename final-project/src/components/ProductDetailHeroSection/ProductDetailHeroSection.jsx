import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { Grid, Box, Typography, Rating, Button, Divider, Skeleton, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useGetProductByIdQuery } from "../../store/api/productsApi.js";
import { addItem } from "../../store/slices/cartSlice.js";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import './ProductDetailHeroSection.scss';

const ProductDetailHeroSection = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data: product, isLoading, isError, error } = useGetProductByIdQuery(id);

    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    if (isError) {
        return (
            <Box className="product-hero">
                <ErrorMessage error={error?.message || error?.data?.message || "Error product loading"} />
            </Box>
        );
    }

    if (!isLoading && (!product || !product.images)) return null;

    const mainImage = product?.images?.[activeImageIndex] || product?.images?.[0];

    const oldPrice = product?.discountPercentage
        ? Math.round(product.price / (1 - product.discountPercentage / 100))
        : null;

    const isMaxReached = product?.stock && quantity >= product.stock;

    return (
        <Box className="product-hero">
            <Grid container spacing={4} className="product-hero__grid">
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box className="product-hero__gallery">
                        <Box className="product-hero__thumbnails">
                            {isLoading ? (
                                [1, 2, 3].map((_, idx) => (
                                    <Skeleton
                                        key={idx}
                                        variant="rectangular"
                                        animation="wave"
                                        sx={{
                                            width: { xs: '100px', md: '152px' },
                                            height: { xs: '110px', md: '167px' },
                                            borderRadius: '20px',
                                            flexShrink: 0
                                        }}
                                    />
                                ))
                            ) : (
                                product.images.slice(0, 3).map((img, idx) => (
                                    <Box
                                        key={idx}
                                        className={`product-hero__thumb ${activeImageIndex === idx ? 'product-hero__thumb--active' : ''}`}
                                        onClick={() => setActiveImageIndex(idx)}
                                    >
                                        <img src={img} alt={`thumb-${idx}`} />
                                    </Box>
                                ))
                            )}
                        </Box>
                        <Box className="product-hero__main-image">
                            {isLoading ? (
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    sx={{ width: '100%', height: { xs: '350px', md: '530px' }, borderRadius: '20px' }}
                                />
                            ) : (
                                <img src={mainImage} alt={product.title} />
                            )}
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Box className="product-hero__info">
                        {isLoading ? (
                            <Skeleton variant="text" animation="wave" sx={{ width: '80%', height: '48px' }} />
                        ) : (
                            <Typography variant="h1" className="product-hero__title">{product.title}</Typography>
                        )}

                        <Box className="product-hero__rating-row">
                            {isLoading ? (
                                <Skeleton variant="text" animation="wave" sx={{ width: '150px', height: '24px' }} />
                            ) : (
                                <>
                                    <Rating value={product.rating || 0} precision={0.5} readOnly />
                                    <Typography variant="body2" className="product-hero__rating-text">
                                        {product.rating}/5
                                    </Typography>
                                </>
                            )}
                        </Box>

                        <Box className="product-hero__price-row">
                            {isLoading ? (
                                <Skeleton variant="text" animation="wave" sx={{ width: '200px', height: '38px' }} />
                            ) : (
                                <>
                                    <Typography className="product-hero__price">${product.price}</Typography>
                                    {oldPrice && <Typography className="product-hero__price-old">${oldPrice}</Typography>}
                                    {product.discountPercentage && (
                                        <Box className="product-hero__discount">-{Math.round(product.discountPercentage)}%</Box>
                                    )}
                                </>
                            )}
                        </Box>

                        {isLoading ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <Skeleton variant="text" animation="wave" sx={{ width: '100%', height: '20px' }} />
                                <Skeleton variant="text" animation="wave" sx={{ width: '95%', height: '20px' }} />
                                <Skeleton variant="text" animation="wave" sx={{ width: '70%', height: '20px' }} />
                            </Box>
                        ) : (
                            <Typography className="product-hero__description">{product.description}</Typography>
                        )}

                        <Divider className="product-hero__divider" />

                        <Box className="product-hero__actions">
                            <Box className="product-hero__qty" sx={{ position: 'relative' }}>
                                <IconButton
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    disabled={isLoading}
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <Typography className="product-hero__qty-value">{quantity}</Typography>
                                <IconButton
                                    onClick={() => setQuantity(q => product?.stock ? Math.min(product.stock, q + 1) : q + 1)}
                                    disabled={isLoading || isMaxReached}
                                >
                                    <AddIcon />
                                </IconButton>
                                {isMaxReached && (
                                    <Typography sx={{ fontSize: '9px', color: 'red', position: 'absolute', bottom: '-15px', width: '100%', textAlign: 'center' }}>
                                        Out of stock
                                    </Typography>
                                )}
                            </Box>
                            <Button
                                variant="contained"
                                className="product-hero__add-btn"
                                fullWidth
                                disabled={isLoading}
                                onClick={() => dispatch(addItem({ ...product, quantity }))}
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetailHeroSection;