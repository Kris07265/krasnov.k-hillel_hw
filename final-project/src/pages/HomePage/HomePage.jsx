import HeroSection from "../../components/HeroSection/HeroSection.jsx";
import BrandsBar from "../../components/BrandsBar/BrandsBar.jsx";
import {useGetProductsQuery} from "../../store/api/productsApi.js";
import ProductSection from "../../components/ProductSection/ProductSection.jsx";
import BrowseByStyleSection from "../../components/BrowseByStyleSection/BrowseByStyleSection.jsx";
import ReviewsSection from "../../components/ReviewsSection/ReviewsSection.jsx";
import { useNavigate } from "react-router";

const HomePage = () => {
    const navigate = useNavigate();

    const { data: newArrivalsData, isLoading: isNewLoading, error: newError } =
        useGetProductsQuery({
            limit: 4,
            sortBy: 'id',
            order: 'desc'
        });

    const { data: topRatingData, isLoading: isTopLoading, error: topError } =
        useGetProductsQuery({
            limit: 4,
            sortBy: 'rating',
            order: 'desc'
        });

    const handleViewAll = (sortType) => {
        window.scrollTo(0, 0);
        navigate('/all-products', { state: { sort: sortType } });
    };

    return (
        <>
            <HeroSection />
            <BrandsBar/>

            <ProductSection
                title="NEW ARRIVALS"
                products={newArrivalsData?.products || []}
                isLoading={isNewLoading}
                error={newError}
                onViewAllClick={() => handleViewAll('new-arrivals')}
            />

            <ProductSection
                title="TOP RATING"
                products={topRatingData?.products || []}
                isLoading={isTopLoading}
                error={topError}
                onViewAllClick={() => handleViewAll('top-rating')}
            />

            <BrowseByStyleSection/>
            <ReviewsSection/>
        </>
    )
}
export default HomePage;