import { Box, Container, CircularProgress } from '@mui/material';
import { useGetCategoriesQuery } from "../../store/api/productsApi.js";
import './BrandsBar.scss';

const BrandsBar = () => {
    const { data: categories, isLoading, error } = useGetCategoriesQuery();

    if (isLoading) {
        return (
            <Box className="brands brands--loading">
                <CircularProgress size={20} color="inherit" />
            </Box>
        );
    }

    if (error || !categories) return null;

    const displayedBrands = categories.slice(0, 4);

    return (
        <Box component="section" className="brands">
            <Container className="brands__container">
                {displayedBrands.map((category) => (
                    <span key={category} className="brands__logo">
                        {category.replace('-', ' ').toUpperCase()}
                    </span>
                ))}
            </Container>
        </Box>
    );
};

export default BrandsBar;