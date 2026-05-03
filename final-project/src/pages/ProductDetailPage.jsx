import ProductDetailHeroSection from "../components/ProductDetailHeroSection/ProductDetailHeroSection.jsx";
import ProductDetailReviewsSection from "../components/ProductDetailReviewsSection/ProductDetailReviewsSection.jsx";
import ProductDetailRelatedProductsSection from "../components/ProductDetailRelatedProductsSection/ProductDetailRelatedProductsSection.jsx";

const ProductDetailPage = () => {
    return (
        <>
            <ProductDetailHeroSection/>
            <ProductDetailReviewsSection/>
            <ProductDetailRelatedProductsSection/>
        </>
    )
}

export default ProductDetailPage