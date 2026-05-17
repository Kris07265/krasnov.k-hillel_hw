import ProductDetailHeroSection from "../../components/ProductDetailHeroSection/ProductDetailHeroSection.jsx";
import ProductDetailTabsSection from "../../components/ProductDetailTabsSection/ProductDetailTabsSection.jsx";
import ProductDetailRelatedProductsSection from "../../components/ProductDetailRelatedProductsSection/ProductDetailRelatedProductsSection.jsx";

const ProductDetailPage = () => {
    return (
        <>
            <ProductDetailHeroSection/>
            <ProductDetailTabsSection/>
            <ProductDetailRelatedProductsSection/>
        </>
    )
}

export default ProductDetailPage