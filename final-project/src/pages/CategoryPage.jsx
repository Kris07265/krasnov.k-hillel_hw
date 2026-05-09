import React, { useState } from 'react';
import { Container, Grid, Drawer, Box } from '@mui/material';
import Filters from "../components/Filters/Filters.jsx";
import ProductsList from "../components/ProductsList/ProductsList.jsx";
import {useParams} from "react-router";

const CategoryPage = () => {
    const { categoryName } = useParams();

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const toggleMobileFilters = () => {
        setIsMobileFiltersOpen(!isMobileFiltersOpen);
    };

    return (
        <Container sx={{ py: 4 }}>
            <Grid container spacing={{ md: 10 }}>
                <Grid size={{md: 3}} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Filters />
                </Grid>

                <Grid size={{xs:12, md: 9}}>
                    <ProductsList
                        onFilterClick={toggleMobileFilters}
                        categoryName={categoryName}
                    />
                </Grid>
            </Grid>

            <Drawer
                anchor="bottom"
                open={isMobileFiltersOpen}
                onClose={toggleMobileFilters}
            >

                <Filters onClose={toggleMobileFilters} />
            </Drawer>
        </Container>
    );
};

export default CategoryPage;