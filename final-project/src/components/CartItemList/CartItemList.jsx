import React from 'react';
import { Box } from '@mui/material';
import CartItem from '../CartItem/CartItem';
import './CartItemList.scss';

const CartItemList = ({ items }) => {
    return (
        <Box className="cart-items-section">
            <Box className="cart-items-section__block">
                {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </Box>
        </Box>
    );
};

export default CartItemList;