import React from 'react';
import { Box, Container, Typography, Button, CircularProgress } from '@mui/material';
import "./AppHero.scss"
import {useGetProductByIdQuery} from "../../store/api/productsApi.js";

const AppHero = () => {

    const { data: product, isLoading, isError } = useGetProductByIdQuery(86);

    return (
        <Box component="section" className="hero-wrapper">
            <Container maxWidth="xl" className="hero-container">
                <Box className="hero-flex-layout">

                    <Box className="hero-content">
                        <Typography variant="h1" className="hero-title">
                            FIND CLOTHES THAT MATCHES YOUR STYLE
                        </Typography>
                        <Typography className="hero-description">
                            Browse through our diverse range of meticulously crafted garments, designed
                            to bring out your individuality and cater to your sense of style.
                        </Typography>
                        <Button variant="contained" className="hero-btn">
                            Shop Now
                        </Button>

                        <Box className="hero-stats">
                            <Box className="stat-item">
                                <Typography variant="h3">200+</Typography>
                                <Typography variant="body2">International Brands</Typography>
                            </Box>
                            <Box className="stat-divider" />
                            <Box className="stat-item">
                                <Typography variant="h3">2,000+</Typography>
                                <Typography variant="body2">High-Quality Products</Typography>
                            </Box>
                            <Box className="stat-divider" />
                            <Box className="stat-item">
                                <Typography variant="h3">30,000+</Typography>
                                <Typography variant="body2">Happy Customers</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="hero-image-section">
                        <Box className="hero-image-container">
                            {isLoading ? (
                                <Box className="hero-loader">
                                    <CircularProgress color="inherit" />
                                </Box>
                            ) : isError ? null : (
                                <img
                                    src={product?.images[0]}
                                    alt={product?.title}
                                    className="main-hero-img api-image"
                                />
                            )}
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
};

export default AppHero;