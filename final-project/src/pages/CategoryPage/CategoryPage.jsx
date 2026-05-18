import {useState} from 'react';
import { Container, Grid, Drawer} from '@mui/material';
import Filters from "../../components/Filters/Filters.jsx";
import ProductsList from "../../components/ProductsList/ProductsList.jsx";
import {useParams} from "react-router";
import BreadcrumbsComponent from "../../components/BreadcrumbsComponent/BreadcrumbsComponent.jsx";

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const initialFilters = {
        price: [0, 20000],
        rating: 0,
        weight: [0, 50],
        width: [0, 100],
        height: [0, 100],
        depth: [0, 100]
    };

    const [tempFilters, setTempFilters] = useState(initialFilters);
    const [appliedFilters, setAppliedFilters] = useState(initialFilters);

    const toggleMobileFilters = () => {
        setIsMobileFiltersOpen(!isMobileFiltersOpen);
    };

    const handleApplyFilters = () => {
        setAppliedFilters(tempFilters);
        if (isMobileFiltersOpen) toggleMobileFilters();
    };

    return (
        <Container sx={{ py: 4 }}>
            <BreadcrumbsComponent />
            <Grid container spacing={{ md: 10 }}>
                <Grid size={{md: 3}} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Filters
                        filters={tempFilters}
                        onFilterChange={setTempFilters}
                        onApply={handleApplyFilters}
                    />
                </Grid>

                <Grid size={{xs:12, md: 9}}>
                    <ProductsList
                        onFilterClick={toggleMobileFilters}
                        categoryName={categoryName}
                        activeFilters={appliedFilters}
                    />
                </Grid>
            </Grid>

            <Drawer
                anchor="bottom"
                open={isMobileFiltersOpen}
                onClose={toggleMobileFilters}
            >
                <Filters
                    onClose={toggleMobileFilters}
                    filters={tempFilters}
                    onFilterChange={setTempFilters}
                    onApply={handleApplyFilters}
                />
            </Drawer>
        </Container>
    );
};

export default CategoryPage;