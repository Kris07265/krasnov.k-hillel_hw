import {createBrowserRouter} from "react-router";
import CartPage from "./pages/CartPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AppLayout from "./components/AppLayout.jsx";

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <AppLayout/>
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
                path: "product/:id",
                element: <ProductDetailPage />
            }
        ]
    }
]);

export default AppRouter;
