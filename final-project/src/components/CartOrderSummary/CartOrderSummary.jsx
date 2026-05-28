import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import OrderSuccessModal from '../OrderSuccessModal/OrderSuccessModal';
import { clearCart } from '../../store/slices/cartSlice.js';
import './CartOrderSummary.scss';
import PropTypes from "prop-types";

const CartOrderSummary = ({ subtotal }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const discountPercent = 20;
    const deliveryFee = 15;

    const discountAmount = Math.round(subtotal * (discountPercent / 100));
    const total = subtotal - discountAmount + deliveryFee;

    const handleCheckout = () => {
        setIsModalOpen(true);

        setTimeout(() => {
            setIsModalOpen(false);
            dispatch(clearCart());
            navigate('/');
        }, 3000);
    };

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
                onClick={handleCheckout}
            >
                Go to Checkout
            </Button>

            <OrderSuccessModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Box>
    );
};

CartOrderSummary.propTypes = {
    subtotal: PropTypes.number.isRequired
};

export default CartOrderSummary;