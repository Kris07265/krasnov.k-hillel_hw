import HeroProductDetail from "../components/HeroProductDetail/HeroProductDetail.jsx";
import ProductReviewsSection from "../components/ProductReviewsSection/ProductReviewsSection.jsx";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts.jsx";

const ProductDetailPage = () => {
    return (
        <>
            <HeroProductDetail/>
            <ProductReviewsSection/>
            <RelatedProducts/>
        </>
    )
}

export default ProductDetailPage