import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { useGetCategoriesQuery } from "../../store/api/productsApi.js";
import './BrowseByStyleSection.scss';
import BrowseByStyleItem from "../BrowseByStyleItem/BrowseByStyleItem.jsx";

const BrowseByStyleSection = () => {
    const { data: categories, isLoading, isError } = useGetCategoriesQuery();

    const styleCategories = categories ? categories.slice(0, 4) : [];

    if (isError) return null;

    return (
        <Container className="browse-style">
            <Box className="browse-style__card">
                <Typography variant="h2" className="browse-style__title">
                    BROWSE BY DRESS STYLE
                </Typography>

                {isLoading ? (
                    <Box className="browse-style__loader">
                        <CircularProgress color="inherit" />
                    </Box>
                ) : (
                    <Box className="browse-style__grid">
                        {styleCategories.map((cat, index) => {
                            const categoryName = typeof cat === 'string' ? cat : cat.name;

                            return (
                                <BrowseByStyleItem
                                    key={categoryName}
                                    categoryName={categoryName}
                                    index={index}
                                />
                            );
                        })}
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default BrowseByStyleSection;