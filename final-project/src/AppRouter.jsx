import {createBrowserRouter} from "react-router";
import CartPage from "./pages/CartPage/CartPage.jsx";
import CategoryPage from "./pages/CategoryPage/CategoryPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Layout from "./components/Layout/Layout.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <Layout/>
        ),
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "cart",
                element: <CartPage />
            },
            {
                path: "category/:categoryName",
                element: <CategoryPage />
            },
            {
                path: "all-products",
                element: <CategoryPage />
            },
            {
                path: "product/:id",
                element: <ProductDetailPage />
            },
            {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    }
]);

export default AppRouter;
