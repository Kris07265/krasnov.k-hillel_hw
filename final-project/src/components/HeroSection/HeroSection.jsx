import { Box, Container, Typography, Button, CircularProgress } from '@mui/material';
import "./HeroSection.scss"
import {useGetProductByIdQuery} from "../../store/api/productsApi.js";

const HeroSection = () => {

    const { data: product, isLoading, isError } = useGetProductByIdQuery(86);

    return (
        <Box component="section" className="hero">
            <Container>
                <Box className="hero__layout">

                    <Box className="hero__content">
                        <Typography variant="h1" className="hero__title">
                            FIND CLOTHES THAT MATCHES YOUR STYLE
                        </Typography>
                        <Typography className="hero__description">
                            Browse through our diverse range of meticulously crafted garments, designed
                            to bring out your individuality and cater to your sense of style.
                        </Typography>
                        <Button variant="contained" className="hero__btn">
                            Shop Now
                        </Button>

                        <Box className="hero__stats">
                            <Box className="hero__stat-item">
                                <Typography variant="h3">200+</Typography>
                                <Typography variant="body2">International Brands</Typography>
                            </Box>
                            <Box className="hero__stat-divider" />
                            <Box className="hero__stat-item">
                                <Typography variant="h3">2,000+</Typography>
                                <Typography variant="body2">High-Quality Products</Typography>
                            </Box>
                            <Box className="hero__stat-divider" />
                            <Box className="hero__stat-item">
                                <Typography variant="h3">30,000+</Typography>
                                <Typography variant="body2">Happy Customers</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="hero__image-section">
                        <Box className="hero__image-container">
                            {isLoading ? (
                                <Box className="hero__loader">
                                    <CircularProgress color="inherit" />
                                </Box>
                            ) : isError ? null : (
                                <img
                                    src={product?.images[0]}
                                    alt={product?.title}
                                    className="hero__img hero__img--api"
                                />
                            )}
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
};

export default HeroSection;