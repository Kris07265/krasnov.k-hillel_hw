import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { Container, Grid, Typography, Button } from '@mui/material';

import CartItemList from '../../components/CartItemList/CartItemList';
import CartOrderSummary from '../../components/CartOrderSummary/CartOrderSummary';
import './CartPage.scss';
import BreadcrumbsComponent from "../../components/BreadcrumbsComponent/BreadcrumbsComponent.jsx";

const CartPage = () => {
    const { items, totalAmount } = useSelector((state) => state.cart);

    if (items.length === 0) {
        return (
            <Container className="cart-view-page cart-view-page--empty">
                <Typography className="cart-view-page__empty-title">
                    Your cart is empty
                </Typography>
                <Button variant="contained" component={Link} to="/" className="cart-view-page__shop-btn" disableRipple>
                    Go to Shop
                </Button>
            </Container>
        );
    }

    return (
        <Container className="cart-view-page">
            <BreadcrumbsComponent />

            <Typography variant="h1" className="cart-view-page__main-title">
                Your Cart
            </Typography>

            <Grid container spacing={3} className="cart-view-page__grid">
                <Grid size={{xs:12, md: 7}}>
                    <CartItemList items={items} />
                </Grid>

                <Grid size={{xs:12, md: 5}}>
                    <CartOrderSummary subtotal={totalAmount} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default CartPage;