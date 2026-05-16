import React from 'react';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import './CartOrderSummary.scss';

const CartOrderSummary = ({ subtotal }) => {
    const discountPercent = 20;
    const deliveryFee = 15;

    const discountAmount = Math.round(subtotal * (discountPercent / 100));
    const total = subtotal - discountAmount + deliveryFee;

    return (
        <Box className="order-summary">
            <Typography variant="h2" className="order-summary__title">
                Order Summary
            </Typography>

            <Box className="order-summary__list">
                <Box className="order-summary__row">
                    <Typography className="order-summary__label">Subtotal</Typography>
                    <Typography className="order-summary__val">${subtotal}</Typography>
                </Box>

                <Box className="order-summary__row">
                    <Typography className="order-summary__label">Discount (-{discountPercent}%)</Typography>
                    <Typography className="order-summary__val order-summary__val--discount">-${discountAmount}</Typography>
                </Box>

                <Box className="order-summary__row">
                    <Typography className="order-summary__label">Delivery Fee</Typography>
                    <Typography className="order-summary__val">${deliveryFee}</Typography>
                </Box>

                <Box className="order-summary__line" />

                <Box className="order-summary__row order-summary__row--total">
                    <Typography className="order-summary__total-label">Total</Typography>
                    <Typography className="order-summary__total-val">${total}</Typography>
                </Box>
            </Box>

            <Box className="order-summary__promo">
                <TextField
                    placeholder="Add promo code"
                    variant="outlined"
                    fullWidth
                    className="order-summary__promo-input"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" className="order-summary__promo-icon">
                                <LocalOfferOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="contained" className="order-summary__promo-btn" disableRipple>
                    Apply
                </Button>
            </Box>

            <Button
                variant="contained"
                fullWidth
                className="order-summary__checkout-btn"
                endIcon={<ArrowForwardIcon />}
                disableRipple
            >
                Go to Checkout
            </Button>
        </Box>
    );
};

export default CartOrderSummary;