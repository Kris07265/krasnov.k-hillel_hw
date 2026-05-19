import { Box, Container, Skeleton } from '@mui/material';
import { Link } from 'react-router';
import { useGetCategoriesQuery } from "../../store/api/productsApi.js";
import './BrandsBar.scss';

const BrandsBar = () => {
    const { data: categories, isLoading, error } = useGetCategoriesQuery();

    if (isLoading) {
        return (
            <Box component="section" className="brands">
                <Container className="brands__container">
                    {Array.from(new Array(4)).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="text"
                            animation="wave"
                            sx={{
                                width: { xs: '120px', md: '160px' },
                                height: { xs: '40px', md: '50px' },
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                borderRadius: '4px'
                            }}
                        />
                    ))}
                </Container>
            </Box>
        );
    }

    if (error || !categories) return null;

    const displayedBrands = categories.slice(0, 4);

    return (
        <Box component="section" className="brands">
            <Container className="brands__container">
                {displayedBrands.map((category) => (
                    <Link
                        key={category}
                        to={`/category/${category}`}
                        className="brands__logo"
                    >
                        {category.replace('-', ' ').toUpperCase()}
                    </Link>
                ))}
            </Container>
        </Box>
    );
};

export default BrandsBar;