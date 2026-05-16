import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { addItem, removeItem } from '../../store/slices/cartSlice.js';
import './CartItem.scss';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleIncrease = () => {
        dispatch(addItem({ id: item.id, price: item.price, title: item.title, thumbnail: item.thumbnail }));
    };

    const handleDecrease = () => {
        dispatch(removeItem(item.id));
    };

    return (
        <Box className="cart-item">
            <Box className="cart-item__image-container">
                <img src={item.thumbnail} alt={item.title} className="cart-item__image" />
            </Box>

            <Box className="cart-item__content">
                <Box className="cart-item__header">
                    <Typography className="cart-item__title">{item.title}</Typography>
                    <IconButton
                        onClick={() => dispatch(removeItem(item.id))}
                        className="cart-item__delete-btn"
                        disableRipple
                    >
                        <DeleteOutlinedIcon />
                    </IconButton>
                </Box>

                <Box className="cart-item__footer">
                    <Typography className="cart-item__price">${item.price}</Typography>

                    <Box className="cart-item__counter">
                        <IconButton onClick={handleDecrease} className="cart-item__counter-btn" disableRipple>
                            <RemoveIcon />
                        </IconButton>
                        <Typography className="cart-item__counter-value">{item.quantity}</Typography>
                        <IconButton onClick={handleIncrease} className="cart-item__counter-btn" disableRipple>
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CartItem;