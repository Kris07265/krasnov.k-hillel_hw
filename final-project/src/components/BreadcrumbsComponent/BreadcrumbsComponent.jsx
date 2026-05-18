import { Link, useLocation, useParams } from "react-router";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useGetProductByIdQuery } from "../../store/api/productsApi.js";
import "./BreadcrumbsComponent.scss";

const BreadcrumbsComponent = () => {
    const location = useLocation();
    const params = useParams();
    const { pathname } = location;

    const isProductPage = !!params.id && pathname.startsWith("/product/");

    const { data: product } = useGetProductByIdQuery(params.id, {
        skip: !isProductPage,
    });

    const formatLabel = (text) => {
        if (!text) return "";
        return decodeURIComponent(text).replace(/-/g, " ");
    };


    if (pathname === "/") {
        return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="breadcrumbs-container">
                <Typography className="breadcrumbs-current">Home</Typography>
            </Breadcrumbs>
        );
    }

    if (pathname === "/cart") {
        return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="breadcrumbs-container">
                <Link to="/">Home</Link>
                <Typography className="breadcrumbs-current">Cart</Typography>
            </Breadcrumbs>
        );
    }

    if (pathname.startsWith("/category/") && params.categoryName) {
        return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="breadcrumbs-container">
                <Link to="/">Home</Link>
                <Typography className="breadcrumbs-current">
                    {formatLabel(params.categoryName)}
                </Typography>
            </Breadcrumbs>
        );
    }

    if (pathname === "/all-products") {
        return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="breadcrumbs-container">
                <Link to="/">Home</Link>
                <Typography className="breadcrumbs-current">All Products</Typography>
            </Breadcrumbs>
        );
    }

    if (isProductPage) {
        return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="breadcrumbs-container">
                <Link to="/">Home</Link>
                {product ? (
                    <Link to={`/category/${product.category}`}>
                        {formatLabel(product.category)}
                    </Link>
                ) : null}
                {product ? (
                    <Typography className="breadcrumbs-current">
                        {product.title}
                    </Typography>
                ) : (
                    <Typography className="breadcrumbs-current">Loading product...</Typography>
                )}
            </Breadcrumbs>
        );
    }

    return null;
};

export default BreadcrumbsComponent;