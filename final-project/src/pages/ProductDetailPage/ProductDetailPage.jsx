import ProductDetailHeroSection from "../../components/ProductDetailHeroSection/ProductDetailHeroSection.jsx";
import ProductDetailTabsSection from "../../components/ProductDetailTabsSection/ProductDetailTabsSection.jsx";
import ProductDetailRelatedProductsSection from "../../components/ProductDetailRelatedProductsSection/ProductDetailRelatedProductsSection.jsx";
import BreadcrumbsComponent from "../../components/BreadcrumbsComponent/BreadcrumbsComponent.jsx";
import {Container} from "@mui/material";

const ProductDetailPage = () => {
    return (
            <Container>
            <BreadcrumbsComponent />
            <ProductDetailHeroSection/>
            <ProductDetailTabsSection/>
            <ProductDetailRelatedProductsSection/>
            </Container>
    )
}

export default ProductDetailPage