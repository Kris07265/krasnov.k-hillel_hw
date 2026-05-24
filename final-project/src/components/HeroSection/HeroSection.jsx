import {Box, Container, Typography, Button, Skeleton} from '@mui/material';
import "./HeroSection.scss"
import {useGetProductByIdQuery} from "../../store/api/productsApi.js";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import heroStar from '../../assets/img/heroStar.png';
import { Link } from 'react-router'

const HeroSection = () => {

    const { data: product, isLoading, isError, error } = useGetProductByIdQuery(86);

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
                        <Button
                            variant="contained"
                            className="hero__btn"
                            component={Link}
                            to="/all-products"
                            onClick={() => {window.scrollTo(0, 0)}}
                        >
                            Shop Now
                        </Button>

                        <Box className="hero__stats">
                            <Box className="hero__stat-item">
                                <Typography variant="h3" className="hero__stat-value">200+</Typography>
                                <Typography variant="body2" className="hero__stat-label">International Brands</Typography>
                            </Box>
                            <Box className="hero__stat-divider" />
                            <Box className="hero__stat-item">
                                <Typography variant="h3" className="hero__stat-value">2,000+</Typography>
                                <Typography variant="body2" className="hero__stat-label">High-Quality Products</Typography>
                            </Box>
                            <Box className="hero__stat-divider" />
                            <Box className="hero__stat-item">
                                <Typography variant="h3" className="hero__stat-value">30,000+</Typography>
                                <Typography variant="body2" className="hero__stat-label">Happy Customers</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box className="hero__image-section">
                        <Box className="hero__image-container">
                            {isLoading ? (
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    sx={{
                                        width: '60%',
                                        height: { xs: '250px', md: '450px' },
                                        borderRadius: '8px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.06)'
                                    }}
                                />
                            ) : isError ? (
                                <ErrorMessage error={error?.message || error?.data?.message || "Error product loading"} />
                            ) : (
                                <img
                                    src={product?.images[0]}
                                    alt={product?.title}
                                    className="hero__img"
                                />
                            )}
                            <img
                                src={`${heroStar}`}
                                alt="vector"
                                className="hero__star hero__star--small"
                            />
                            <img
                                src={`${heroStar}`}
                                alt="vector"
                                className="hero__star hero__star--large"
                            />
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
};

export default HeroSection;