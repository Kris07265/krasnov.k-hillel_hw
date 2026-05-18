import { useParams} from 'react-router';
import { useDispatch } from 'react-redux';
import {useState} from "react";
import {
    Container, Grid, Box, Typography, Rating,
    Button, Divider, CircularProgress, IconButton, Breadcrumbs
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { useGetProductByIdQuery } from "../../store/api/productsApi.js";
import { addItem } from "../../store/slices/cartSlice.js";
import './ProductDetailHeroSection.scss';

const ProductDetailHeroSection = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data: product, isLoading } = useGetProductByIdQuery(id);

    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    if (isLoading) return <Box className="product-hero__loader"><CircularProgress color="inherit" /></Box>;
    if (!product || !product.images) return null;

    const mainImage = product.images[activeImageIndex] || product.images[0];

    const oldPrice = product.discountPercentage
        ? Math.round(product.price / (1 - product.discountPercentage / 100))
        : null;

    return (
        <Container className="product-hero">
            <Grid container spacing={4} className="product-hero__grid">
                <Grid size={{xs:12, md: 6}}>
                    <Box className="product-hero__gallery">
                        <Box className="product-hero__thumbnails">
                            {product.images.slice(0, 3).map((img, idx) => (
                                <Box
                                    key={idx}
                                    className={`product-hero__thumb ${activeImageIndex === idx ? 'product-hero__thumb--active' : ''}`}
                                    onClick={() => setActiveImageIndex(idx)}
                                >
                                    <img src={img} alt={`thumb-${idx}`} />
                                </Box>
                            ))}
                        </Box>
                        <Box className="product-hero__main-image">
                            <img src={mainImage} alt={product.title} />
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{xs:12, md: 6}}>
                    <Box className="product-hero__info">
                        <Typography variant="h1" className="product-hero__title">{product.title}</Typography>

                        <Box className="product-hero__rating-row">
                            <Rating value={product.rating || 0} precision={0.5} readOnly />
                            <Typography variant="body2" className="product-hero__rating-text">
                                {product.rating}/5
                            </Typography>
                        </Box>

                        <Box className="product-hero__price-row">
                            <Typography className="product-hero__price">${product.price}</Typography>
                            {oldPrice && <Typography className="product-hero__price-old">${oldPrice}</Typography>}
                            {product.discountPercentage && (
                                <Box className="product-hero__discount">-{Math.round(product.discountPercentage)}%</Box>
                            )}
                        </Box>

                        <Typography className="product-hero__description">{product.description}</Typography>

                        <Divider className="product-hero__divider" />

                        <Box className="product-hero__actions">
                            <Box className="product-hero__qty">
                                <IconButton onClick={() => setQuantity(q => Math.max(1, q - 1))}><RemoveIcon /></IconButton>
                                <Typography className="product-hero__qty-value">{quantity}</Typography>
                                <IconButton onClick={() => setQuantity(q => q + 1)}><AddIcon /></IconButton>
                            </Box>
                            <Button
                                variant="contained"
                                className="product-hero__add-btn"
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

export default ProductDetailHeroSection;