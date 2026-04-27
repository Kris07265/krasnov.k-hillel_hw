import AppHero from "../components/AppHero/AppHero.jsx";
import AppBrandsBar from "../components/AppBrandsBar/AppBrandsBar.jsx";
import {useGetProductsQuery} from "../store/api/productsApi.js";
import ProductSection from "../components/ProductSection/ProductSection.jsx";

const HomePage = () => {

    const { data: newArrivalsData, isLoading: isNewLoading, error: newError } = useGetProductsQuery({ limit: 4, skip: 4});
    const { data: topSellingData, isLoading: isTopLoading, error: topError } = useGetProductsQuery({ limit: 4, skip: 8 });
    return (
        <>
            <AppHero />
            <AppBrandsBar/>

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
        </>
    )
}
export default HomePage