import { Link, useLocation, useParams } from "react-router";
import { Breadcrumbs, Typography, Skeleton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useGetProductByIdQuery } from "../../store/api/productsApi.js";
import "./BreadcrumbsComponent.scss";

const BreadcrumbsComponent = () => {
    const location = useLocation();
    const params = useParams();
    const { pathname } = location;

    const isProductPage = !!params.id && pathname.startsWith("/product/");

    const { data: product, isLoading } = useGetProductByIdQuery(params.id, {
        skip: !isProductPage,
    });

    const formatLabel = (text) => {
        if (!text) return "";
        return decodeURIComponent(text).replace(/-/g, " ");
    };


    if (pathname === "/") {
        return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="breadcrumbs__container">
                <Typography className="breadcrumbs__current">Home</Typography>
            </Breadcrumbs>
        );
    }

    if (pathname === "/cart") {
        return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="breadcrumbs__container">
                <Link to="/">Home</Link>
                <Typography className="breadcrumbs__current">Cart</Typography>
            </Breadcrumbs>
        );
    }

    if (pathname.startsWith("/category/") && params.categoryName) {
        return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="breadcrumbs__container">
                <Link to="/">Home</Link>
                <Typography className="breadcrumbs__current">
                    {formatLabel(params.categoryName)}
                </Typography>
            </Breadcrumbs>
        );
    }

    if (pathname === "/all-products") {
        return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="breadcrumbs__container">
                <Link to="/">Home</Link>
                <Typography className="breadcrumbs__current">All Products</Typography>
            </Breadcrumbs>
        );
    }

    if (isProductPage) {
        return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="breadcrumbs__container">
                <Link to="/">Home</Link>
                {isLoading ? (
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ width: '80px', height: '21px', display: 'inline-block' }}
                    />
                ) : product ? (
                    <Link to={`/category/${product.category}`}>
                        {formatLabel(product.category)}
                    </Link>
                ) : null}
                {isLoading ? (
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ width: '150px', height: '21px', display: 'inline-block' }}
                    />
                ) : product ? (
                    <Typography className="breadcrumbs__current">
                        {product.title}
                    </Typography>
                ) : null}
            </Breadcrumbs>
        );
    }

    return null;
};

export default BreadcrumbsComponent;