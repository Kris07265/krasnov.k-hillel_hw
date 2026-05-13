import HeroSection from "../components/HeroSection/HeroSection.jsx";
import BrandsBar from "../components/BrandsBar/BrandsBar.jsx";
import {useGetProductsQuery} from "../store/api/productsApi.js";
import ProductSection from "../components/ProductSection/ProductSection.jsx";
import BrowseByStyleSection from "../components/BrowseByStyleSection/BrowseByStyleSection.jsx";
import ReviewsSection from "../components/ReviewsSection/ReviewsSection.jsx";

const HomePage = () => {

    const { data: newArrivalsData, isLoading: isNewLoading, error: newError } =
        useGetProductsQuery({
            limit: 4,
            sortBy: 'id',
            order: 'desc'
        });

    const { data: topSellingData, isLoading: isTopLoading, error: topError } =
        useGetProductsQuery({
            limit: 4,
            sortBy: 'rating',
            order: 'desc'
        });
    return (
        <>
            <HeroSection />
            <BrandsBar/>

            <ProductSection
                title="NEW ARRIVALS"
                products={newArrivalsData?.products || []}
                isLoading={isNewLoading}
                error={newError}
            />

            <ProductSection
                title="TOP SELLING"
                products={topSellingData?.products || []}
                isLoading={isTopLoading}
                error={topError}
            />

            <BrowseByStyleSection/>
            <ReviewsSection/>
        </>
    )
}
export default HomePage