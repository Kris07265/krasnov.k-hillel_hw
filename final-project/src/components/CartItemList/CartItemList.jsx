import React from 'react';
import { Box, Typography } from '@mui/material';
import CartItem from '../CartItem/CartItem';
import './CartItemList.scss';

const CartItemList = ({ items }) => {
    return (
        <Box className="cart-items-section">
            <Typography variant="h1" className="cart-items-section__main-title">
                Your Cart
            </Typography>

            <Box className="cart-items-section__block">
                {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </Box>
        </Box>
    );
};

export default CartItemList;