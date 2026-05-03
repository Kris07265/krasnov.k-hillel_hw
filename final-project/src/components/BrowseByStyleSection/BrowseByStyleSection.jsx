import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { useGetCategoriesQuery, useGetProductsQuery } from "../../store/api/productsApi.js";
import './BrowseByStyleSection.scss';

const BrowseByStyleSection = () => {
    const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError } = useGetCategoriesQuery();
    const { data: productsData, isLoading: isProductsLoading, isError: isProductsError } = useGetProductsQuery({ limit: 4, skip: 8 });

    const styleCategories = categories ? categories.slice(0, 4) : [];
    const products = productsData?.products || [];

    if (isCategoriesError || isProductsError) return null;

    const isLoading = isCategoriesLoading || isProductsLoading;

    return (
        <Container maxWidth="xl" className="browse-style">
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
                            const productImage = products[index]?.images[0];

                            return (
                                <Box
                                    key={index}
                                    className={`browse-style__item browse-style__item--type-${index}`}
                                >
                                    <Typography className="browse-style__item-label">
                                        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                                    </Typography>

                                    {productImage && (
                                        <img
                                            src={productImage}
                                            alt={categoryName}
                                            className="browse-style__item-image"
                                        />
                                    )}
                                </Box>
                            );
                        })}
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default BrowseByStyleSection;