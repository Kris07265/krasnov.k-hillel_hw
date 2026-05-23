import { useState, useEffect } from 'react';
import { Container, Grid, Drawer } from '@mui/material';
import Filters from "../../components/Filters/Filters.jsx";
import ProductsList from "../../components/ProductsList/ProductsList.jsx";
import { useParams, useLocation } from "react-router";
import BreadcrumbsComponent from "../../components/BreadcrumbsComponent/BreadcrumbsComponent.jsx";

const CategoryPage = () => {
    const { categoryName } = useParams();
    const location = useLocation();
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const getInitialFilters = () => {
        const defaultFilters = {
            price: [0, 20000],
            rating: 0,
            weight: [0, 50],
            width: [0, 100],
            height: [0, 100],
            depth: [0, 100],
            onSale: location.state?.filter === 'on-sale' ? true : false
        };

        const savedFilters = localStorage.getItem('shop-filters');

        if (savedFilters) {
            try {
                const parsedFilters = JSON.parse(savedFilters);
                if (location.state?.filter === 'on-sale') {
                    parsedFilters.onSale = true;
                } else if (location.state?.filter !== undefined) {
                    parsedFilters.onSale = false;
                }
                return parsedFilters;
            } catch (error) {
                console.error("Error parsing filters from localStorage", error);
                return defaultFilters;
            }
        }

        return defaultFilters;
    };

    const [tempFilters, setTempFilters] = useState(getInitialFilters);
    const [appliedFilters, setAppliedFilters] = useState(getInitialFilters);

    useEffect(() => {
        const isOnSaleRoute = location.state?.filter === 'on-sale';
        setTempFilters(prev => ({ ...prev, onSale: isOnSaleRoute }));
        setAppliedFilters(prev => {
            const updatedFilters = { ...prev, onSale: isOnSaleRoute };
            localStorage.setItem('shop-filters', JSON.stringify(updatedFilters));
            return updatedFilters;
        });
    }, [location.state]);

    const toggleMobileFilters = () => {
        setIsMobileFiltersOpen(!isMobileFiltersOpen);
    };

    const handleApplyFilters = () => {
        setAppliedFilters(tempFilters);
        localStorage.setItem('shop-filters', JSON.stringify(tempFilters));
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