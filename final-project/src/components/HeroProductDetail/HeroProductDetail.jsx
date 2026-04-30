import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useDispatch } from 'react-redux';
import {
    Container, Grid, Box, Typography, Rating,
    Button, Divider, CircularProgress, IconButton, Breadcrumbs
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { useGetProductByIdQuery } from "../../store/api/productsApi.js";
import { addItem } from "../../store/slices/cartSlice.js";
import './HeroProductDetail.scss';

const sizes = ['Small', 'Medium', 'Large', 'X-Large'];
const colors = [
    { name: 'Olive', hex: '#4F4631' },
    { name: 'DeepBlue', hex: '#314F4A' },
    { name: 'Navy', hex: '#31344F' }
];

const HeroProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data: product, isLoading } = useGetProductByIdQuery(id);

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('Large');
    const [selectedColor, setSelectedColor] = useState(colors[0].hex);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    if (isLoading) return <Box className="loader"><CircularProgress color="inherit" /></Box>;
    if (!product || !product.images) return null;

    const mainImage = product.images[activeImageIndex] || product.images[0];

    const oldPrice = product.discountPercentage
        ? Math.round(product.price / (1 - product.discountPercentage / 100))
        : null;

    return (
        <Container maxWidth="xl" className="hero-product-page">
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="breadcrumbs">
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Typography color="text.primary">{product.category}</Typography>
            </Breadcrumbs>

            <Grid container spacing={4} className="product-grid">

                <Grid item xs={12} md={6}>
                    <Box className="gallery-container">
                        <Box className="thumbnails-vertical">
                            {product.images.slice(0, 3).map((img, idx) => (
                                <Box
                                    key={idx}
                                    className={`thumb ${activeImageIndex === idx ? 'active' : ''}`}
                                    onClick={() => setActiveImageIndex(idx)}
                                >
                                    <img src={img} alt={`thumb-${idx}`} />
                                </Box>
                            ))}
                        </Box>
                        <Box className="main-image">
                            <img src={mainImage} alt={product.title} />
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box className="product-info-wrapper">
                        <Typography variant="h1" className="title">{product.title}</Typography>

                        <Box className="rating-row">
                            <Rating value={product.rating || 0} precision={0.5} readOnly />
                            <Typography variant="body2">{product.rating}/5</Typography>
                        </Box>

                        <Box className="price-row">
                            <Typography className="price">${product.price}</Typography>
                            {oldPrice && <Typography className="old-price">${oldPrice}</Typography>}
                            {product.discountPercentage && (
                                <Box className="discount-badge">-{Math.round(product.discountPercentage)}%</Box>
                            )}
                        </Box>

                        <Typography className="desc">{product.description}</Typography>

                        <Divider className="section-divider" />

                        <Box className="option-section">
                            <Typography className="option-title">Select Colors</Typography>
                            <Box className="color-list">
                                {colors.map(color => (
                                    <Box
                                        key={color.hex}
                                        className="color-circle"
                                        style={{ backgroundColor: color.hex }}
                                        onClick={() => setSelectedColor(color.hex)}
                                    >
                                        {selectedColor === color.hex && <CheckIcon sx={{ color: '#fff', fontSize: 16 }} />}
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Divider className="section-divider" />

                        <Box className="option-section">
                            <Typography className="option-title">Choose Size</Typography>
                            <Box className="size-list">
                                {sizes.map(size => (
                                    <Button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </Box>
                        </Box>

                        <Divider className="section-divider" />

                        <Box className="actions">
                            <Box className="qty-selector">
                                <IconButton onClick={() => setQuantity(q => Math.max(1, q - 1))}><RemoveIcon /></IconButton>
                                <Typography>{quantity}</Typography>
                                <IconButton onClick={() => setQuantity(q => q + 1)}><AddIcon /></IconButton>
                            </Box>
                            <Button
                                variant="contained"
                                className="add-to-cart"
                                fullWidth
                                onClick={() => dispatch(addItem({ ...product, quantity }))}
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HeroProductDetail;